import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Groceries extends Model<Groceries> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  name: string;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @Column(DataType.STRING(50))
  category: string;

  @Column(DataType.TEXT)
  description: string;

  @Column(DataType.NOW)
  @CreatedAt
  created_at: Date;

  @Column(DataType.NOW)
  @UpdatedAt
  updated_at: Date;
}
