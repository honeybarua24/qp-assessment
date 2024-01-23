import { Sequelize } from 'sequelize-typescript';
import { Groceries } from 'src/groceries/groceries.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'groceries',
      });
      sequelize.addModels([Groceries]);
      await sequelize.sync();
      return sequelize;
    },
  },
];