import { BadRequestException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Groceries } from './groceries.entity';
import { Op } from 'sequelize'; // Import Op from sequelize

@Injectable()
export class GroceriesService {
    constructor() {}

    /**
     * @returns Array of objects with details of all groceries available.
     */
    async viewGroceries(id?: number){
        try{
            let grocery : any;
            if(id){
                grocery = await Groceries.findByPk(id);
                 if (!grocery) {
                    throw new NotFoundException('Grocery item not found');
                }
            }else{
                grocery = await Groceries.findAll();
            }
            return {data: grocery , status :HttpStatus.OK};
        }catch(error){
            if(error instanceof NotFoundException){
                return {message : error.message , status : HttpStatus.BAD_REQUEST}
            }
            throw new InternalServerErrorException();
        }
    }

    /**
     * @returns Array of objects for groceries available in inventory.
     */
    async viewAvailableGroceries(){
        try{
            let groceries = await Groceries.findAll({attributes: ['id', 'name','price'],where: {
                quantity: {
                  [Op.gt]: 0,
                },
              },});
            return {data: groceries , status :HttpStatus.OK};
        }catch(error){
            throw new InternalServerErrorException();
        }
    }

    /**
     * @param body : Object containing the details of the grocery to be added.
     */
    async addGroceries(body : {name : string , price: number , quantity: number, category: string , description : string}){
        try{
            const newGrocery = Groceries.build({
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                category: body.category,
                description: body.description,
              });
              await newGrocery.save()
              .then((savedGrocery) => {
                console.log(savedGrocery);
              })
              .catch((error) => {
                throw new Error(error.message);
              });
              return {message: 'Items added successfully.', status: HttpStatus.OK}
        }catch(error){
            throw new InternalServerErrorException();
        }
    }

    /**
     * @param id : Id of the groceries to be updated.
     * @param body : Object with details to be updated.
     * @returns : Message with status code.
     */
    async updateGroceries(id: number , body: any){
        try{
            const grocery = await Groceries.findByPk(id);

            if (!grocery) {
                throw new NotFoundException('Grocery item not found');
            }

            if(body.name){
                grocery.name = body.name;
            }

            if(body.price){
                grocery.price = body.price;
            }

            if(body.quantity){
                grocery.quantity = body.quantity;
            }

            await grocery.save();

            return {message: 'Grocery details updated successfully.' , status: HttpStatus.ACCEPTED};
        }catch(error){
            if(error instanceof NotFoundException){
                return {message : error.message , status : HttpStatus.BAD_REQUEST}
            }
            throw new InternalServerErrorException();
        }
    }

    /**
     * @param id : Id of grocery to be deleted.
     */
    async deleteGroceries(id:number){
        try{
            const grocery = await Groceries.findByPk(id);
            if (!grocery) {
                throw new NotFoundException('Grocery item not found');
            }
            await grocery.destroy();
            return {message : 'Item deleted successfully.' , status : HttpStatus.OK};
        }catch(error){
            if(error instanceof NotFoundException){
                return {message : error.message , status : HttpStatus.BAD_REQUEST}
            }
            throw new InternalServerErrorException();
        }
    }

    /** 
     * @param id : Id of grocery whose inventory will be managed.
     * @param body  : Inventory details.
     * @returns : Message with status code.
     */
    async manageGroceriesInventory(id: number, body : {quantity : number , operation : number}){
        try{
            const grocery = await Groceries.findByPk(id);
            if (!grocery) {
                throw new NotFoundException('Grocery item not found');
            }
            if (body.operation === 1) {
                grocery.quantity += parseInt(body.quantity.toString(),10);
              } else if (body.operation === 0) {
                if (grocery.quantity < body.quantity) {
                  throw new BadRequestException('Insufficient inventory.');
                }
                grocery.quantity -= body.quantity;
            }
              await grocery.save();
              return {message : 'Inventory updated successfully.' , status : HttpStatus.OK};
        }catch(error){
            if(error instanceof NotFoundException || error instanceof BadRequestException){
                return {message : error.message , status : HttpStatus.BAD_REQUEST}
            }
            throw new InternalServerErrorException();
        }
    }

    /**
     * @param items : Array of object to be booked/purchased
     * @returns : details of the item booked with specific item amount , message and total amount.
     */
    async bookGroceries(items: { id: number; quantity: number }[]){
        try{
            const groceriesToBook = [];
            const bookedGroceriesDetails = [];
            let totalBill : number = 0;
    
            for (const item of items) {
              const grocery = await Groceries.findByPk(item.id);
        
              if (!grocery) {
                throw new NotFoundException(`Grocery item with id ${item.id} not found`);
              }
        
              if (grocery.quantity < item.quantity) {
                throw new BadRequestException(`Insufficient inventory for item with id ${item.id}`);
              }
        
              groceriesToBook.push(grocery);
            }
        
            for (let grocery of groceriesToBook) {
                const item = items.find(item => parseInt(item.id.toString(),10) === grocery.dataValues.id);
                if (item && grocery.dataValues.quantity !== undefined) {
                    grocery.dataValues.quantity = parseInt(grocery.dataValues.quantity, 10) - parseInt(item.quantity.toString(),10);
                    await grocery.save();
                }
              totalBill  += grocery.dataValues.price*item.quantity;
              bookedGroceriesDetails.push({name: grocery.dataValues.name , price : grocery.dataValues.price*item.quantity})
            }
            return {message :  'Groceries booked successfully' , data : bookedGroceriesDetails , Amount : totalBill , status : HttpStatus.OK}
        }catch(error){
            if(error instanceof NotFoundException || error instanceof BadRequestException){
                return {message : error.message , status : HttpStatus.BAD_REQUEST}
            }
            throw new InternalServerErrorException();
        }
    }
}
