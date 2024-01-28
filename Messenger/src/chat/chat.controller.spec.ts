import { Test, TestingModule } from '@nestjs/testing';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import { chatIdFixture, chatTest, defaultChat, removeChat } from './chat.fixtures';

describe('ChatController', () => {
  let controller: ChatController;
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ChatDBModule],
      controllers: [ChatController],
      providers: [ChatService],
    }).compile();

    controller = module.get<ChatController>(ChatController);
    service = module.get<ChatService>(ChatService)
  });

  it('create Chat', async() => {
    const createdChat = chatTest();
    jest.spyOn(service, 'create').mockImplementation(async () => createdChat);
    expect(await controller.create(createdChat)).toBe(createdChat); 
  });

  it('update chat by id', async() => {
    const id = chatIdFixture;
    const createdChat = chatTest().toString()
    jest.spyOn(service, 'update').mockImplementation(async () => createdChat);
    expect(await controller.update(createdChat, id as any)).toBe(createdChat)
  });

  it('remove chat by id', async() => {
    const id = chatIdFixture;
    const deletedChat = removeChat()
    jest.spyOn(service, 'remove').mockImplementation(async () => deletedChat);
    expect(await controller.remove(id)).toBe(deletedChat)
  });

  it('find all chats', async() => {
    const findAllChats = await service.findAll();
    jest.spyOn(service, 'findAll').mockImplementation(async () => findAllChats);
    expect(await controller.findAll()).toBeInstanceOf(Array)
  });

  it('find chat by id', async() => {
    const id = chatIdFixture;
    const chat = defaultChat();
    jest.spyOn(service, 'findOne').mockImplementation(async () => chat);
    expect(await controller.findOne(id)).toBe(chat)
  });
});
