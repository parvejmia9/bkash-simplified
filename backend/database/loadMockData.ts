import { User } from '../src/models/user.models';
import { Provider } from '../src/models/provider.models';
import sequelize from './db.config';

async function addMockData() {
    await sequelize.sync({ force: false });

    // Correct usage of `UserCreationAttributes` type for mock data
    // await User.bulkCreate([
    //     {
    //         username: 'user1',
    //         phoneNumber: '1234567890',
    //         email: 'user1@example.com',
    //         password: 'password123',
    //         balance: 100
    //     },
    //     {
    //         username: 'user2',
    //         phoneNumber: '9876543210',
    //         email: 'user2@example.com',
    //         password: 'password456',
    //         balance: 200,
    //     },
    //     {
    //         username: 'user3',
    //         phoneNumber: '5556667777',
    //         email: 'user3@example.com',
    //         password: 'password789',
    //         balance: 300,
    //     },
    // ]);
    await Provider.bulkCreate([
        {
          providerId: 1,
          providerName: 'Provider A',
          providerBalance: 5000,
        },
        {
          providerId: 2,
          providerName: 'Provider B',
          providerBalance: 10000,
        },
        {
          providerId: 3,
          providerName: 'Provider C',
          providerBalance: 7500,
        },
      ]);

    console.log('Mock data added successfully');
}

addMockData().catch(console.error);
