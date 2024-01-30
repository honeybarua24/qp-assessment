import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateGroceriesDTO {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;
}