import { createConnection, Connection } from 'typeorm';
import { options } from '../../utils/dbConnectionOptions';
import userService from '../../services/user/userService';
import userRepository from '../../services/user/userRepository';

describe('User service', (): void => {
  let connection: Connection;

  beforeEach(
    async (done): Promise<void> => {
      try {
        require('dotenv').config();
        connection = await createConnection(options());
        done();
      } catch (e) {
        console.log('aqui', e);
        done();
      }
    },
  );

  afterEach(
    async (done): Promise<void> => {
      await connection.close();
      done();
    },
  );

  test('Test adding user to the database', async (done): Promise<void> => {
    let user = {
      name: 'John',
      email: 'nice',
      nameOrganization: 'Nice Co',
      password: 'Very Secret',
    };
    await userService.add(user);
    let resUser = await userService.findUserByEmail(user.email);
    expect(resUser.name).toBe(user.name);
    expect(resUser.email).toBe(user.email);
    expect(resUser.nameOrganization).toBe(user.nameOrganization);
    done();
  });
  test('Authenticating user', async (done): Promise<void> => {
    const user = {
      name: 'John',
      email: 'nice@mail.com',
      nameOrganization: 'Nice Co',
      password: 'Very Secret',
    };
    await userService.add(user);
    const resUser = await userService.findUserByEmail(user.email);
    expect(resUser.name).toBe(user.name);
    expect(resUser.email).toBe(user.email);
    expect(resUser.nameOrganization).toBe(user.nameOrganization);
    done();
  });
});
