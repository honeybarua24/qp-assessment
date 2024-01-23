import { Controller, Get, UseGuards, Request, Delete, Patch, Post, Body, Param, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GroceriesService } from './groceries.service';

@Controller('groceries')
export class GroceriesController {
 constructor(private GroceriesService: GroceriesService){}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Get('/view/:id?')
  viewGroceries(@Request() req , @Param('id') id: number) {
    try{
        return this.GroceriesService.viewGroceries(id);
    }catch(error){
        return error;
    }
  }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin','User')
  @Get('/available')
  viewAvailableGroceries(@Request() req) {
    try{
        return this.GroceriesService.viewAvailableGroceries();
    }catch(error){
        return error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post('/add')
  async addGroceries(@Request() req , @Body() body) {
    try{
      return await this.GroceriesService.addGroceries(body);
    }catch(error){
        return error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Patch('/update/:id')
  updateGroceries(@Request() req , @Param('id') id : number , @Body() body : any) {
    try{
        return this.GroceriesService.updateGroceries(id, body);
    }catch(error){
        return error;
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Delete('/delete/:id')
  deleteGroceries(@Request() req, @Param('id') id : number) {
    try{
        return this.GroceriesService.deleteGroceries(id);
    }catch(error){
        return {message : error.message , staus : HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @Post('/inventory/:id')
  manageInventory(@Request() req, @Param('id') id : number , @Body() body) {
    try{
        return this.GroceriesService.manageGroceriesInventory(id, body);
    }catch(error){
        return {message : error.message , staus : HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('User')
  @Post('/book')
  bookGroceries(@Request() req , @Body() body : []) {
    try{
        return this.GroceriesService.bookGroceries(body);
    }catch(error){
      return {message : error.message , staus : HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }
}
