import { faker } from '@faker-js/faker';
import { Role } from '../constans/roles.enum';

export const defaultUserName = 'Yura';

export function defaultUser(username = defaultUserName) {
    return {
      username,
      phoneNumber: faker.number.int(),
      password: faker.word.words(),
      roles: [Role.USER]
    };
  }

export function userTest() {
    return {
      username: faker.word.noun(),
      phoneNumber: faker.number.int(),
      password: faker.word.words(),
      roles: [Role.USER]
    };
  }

export function updateUser() {
    const id = '659fd5310c3e4d3a2ec2d4f8';
    const username = defaultUserName;
    const phoneNumber = faker.number.int();
    const password = faker.word.words()
    const roles = [Role.USER]
    return {
        id,
        username,
        phoneNumber,
        password,
        roles
    };
}

export function removeUser() {
    const id = '659fd5310c3e4d3a2ec2d4f8';
    const username = 'antoxa';
    const phoneNumber = '89584358735'
    const password = 'dsfrefrtgtrgtr44'
    const roles = [Role.USER]
    return {
        id,
        username,
        phoneNumber,
        password,
        roles
    };
}

export const userIdFixture = '659fd5310c3e4d3a2ec2d4f8';