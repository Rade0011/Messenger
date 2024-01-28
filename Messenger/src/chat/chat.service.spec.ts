import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { ChatDBModule } from './chat.db';
import { chatIdFixture, chatTest, createChat, defaultChat, defaultTitleChat, updateChat } from './chat.fixtures';
import exp from 'constants';

describe('ChatService', () => {
  let service: ChatService;

  async function createChatId(chatDto = defaultChat()) {
    const createdChat = await service.create(chatDto);
    return createdChat._id.toString();
  }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChatDBModule],
      providers: [ChatService],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be create chat', async () => {
    const chatDto = createChat()
    const createdChat = await service.create(chatDto)
    expect(createdChat).toBeDefined();
    expect(createdChat.title).toBe(chatDto.title); 
  });

  it('should update chat by id', async () => {
    const chatDto = chatTest();
    const chatById = await createChatId(chatDto);
    const updatedChat = await service.update(chatById, updateChat());
    expect(updatedChat.title).toBeTruthy();
  });

  it('shold remove chat by id', async () => {
    const deletedChatId = chatIdFixture;
    const result = await service.remove(deletedChatId)
    expect(result).toBeDefined()
  });

  it('should be get all chat', async () => {
    const allChats = await service.findAll();
    expect(allChats).toBeInstanceOf(Array);
  });

  it('should be get chat by id', async () => {
    const chatDto = defaultChat();
    const chatById = await createChatId(chatDto)
    const findChatId = await service.findOne(chatById)
    expect(findChatId.title).toEqual(chatDto.title)
  });

  // afterEach(async () => {
  //   await service.deleteChatByTitle(defaultTitleChat);
  // });
});
