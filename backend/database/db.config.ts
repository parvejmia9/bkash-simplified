import { Sequelize } from 'sequelize-typescript';
import { User } from '../src/models/user.models';  // Make sure to import the User model
import * as dotenv from 'dotenv';
import { Transaction } from '../src/models/transaction.models';
import { Provider } from '../src/models/provider.models';
import { Admin } from '../src/models/admin.models';
import { PromoCode, Usage } from '../src/models/promo.models';

// Database configuration using environment variables
dotenv.config()
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Transaction,Provider,Admin,PromoCode,Usage],  // Make sure to include your models here
  logging: console.log,
});

export default sequelize;