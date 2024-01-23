import { Module } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { GroceriesController } from './groceries.controller';
import { DatabaseModule } from 'src/database/database.module';
import { groceriesProviders } from './groceries.providers';

@Module({
  imports:[DatabaseModule],
  providers: [GroceriesService,...groceriesProviders],
  controllers: [GroceriesController]
})
export class GroceriesModule {}
