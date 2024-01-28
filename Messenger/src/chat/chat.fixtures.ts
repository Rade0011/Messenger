import { faker } from '@faker-js/faker';

export const defaultTitleChat = 'start';

export function defaultChat(title = defaultTitleChat) {
    return {
      title,
      members: [faker.database.mongodbObjectId(), "ab2ebb632c0b7e5fbddec1cd"],
    };
  }

export function chatTest() {
    return {
      title: faker.word.noun(),
      members: [faker.database.mongodbObjectId(), "ab2ebb632c0b7e5fbddec1cd"],
    };
  }

export function createChat() {
    return {
        title: defaultTitleChat,
        members: [faker.database.mongodbObjectId(), "ab2ebb632c0b7e5fbddec1cd"],
    };
}

export function updateChat() {
    const id = '659fd49e1a3627f55a85b9b5';
    const title = defaultTitleChat;
    const members = [faker.database.mongodbObjectId()];
    return {
        id,
        title,
        members
    };
}

export function removeChat() {
    const id = '659fd49e1a3627f55a85b9b5';
    const title = 'finish';
    const members = [faker.database.mongodbObjectId()];
    return {
        id,
        title,
        members
    };
}

export const chatIdFixture = '659fd49e1a3627f55a85b9b5';