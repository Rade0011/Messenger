import { faker } from '@faker-js/faker';

export const defaultTextMessage = 'start';

export function defaultMessage(text = defaultTextMessage) {
    return {
      text,
      author: faker.database.mongodbObjectId(),
      createdAt: faker.date.anytime(),
      chat: faker.database.mongodbObjectId()
    };
  }

export function messageTest() {
    return {
      text: faker.word.noun(),
      author: faker.database.mongodbObjectId(),
      createdAt: faker.date.anytime(),
      chat: faker.database.mongodbObjectId()
    };
  }

export function createMessage() {
    return {
        text: faker.word.noun(),
        author: faker.database.mongodbObjectId(),
        createdAt: faker.date.anytime(),
        chat: faker.database.mongodbObjectId()
    };
}

export function updateMessage() {
    const id = '65a529028f8f312325e29467';
    const text = defaultTextMessage;
    const author = faker.database.mongodbObjectId();
    const createdAt = faker.date.anytime();
    const chat = faker.database.mongodbObjectId();
    return {
        id,
        text,
        author,
        createdAt,
        chat
    };
}

export function removeMessage() {
    const id = '65a529028f8f312325e29467';
    const text = 'finish';
    const author = faker.database.mongodbObjectId();
    const createdAt = faker.date.anytime();
    const chat = faker.database.mongodbObjectId();
    return {
        id,
        text,
        author,
        createdAt,
        chat
    };
}

export const messageIdFixture = '65a529028f8f312325e29467';