import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GroceriesModule } from './groceries/groceries.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule, AuthModule, UsersModule , GroceriesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
