import { Groceries } from "./groceries.entity";

export const groceriesProviders = [
  {
    provide: 'GROCERIES_REPOSITORY',
    useValue: Groceries,
  },
];