import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { MessageDBModule } from './message.db';
import { defaultMessage, defaultTextMessage, messageIdFixture, messageTest, updateMessage } from './message.fixture';
import { createMessage } from './message.fixture';
import { RedisModule } from '../Redis/redis.module';

describe('MessageService', () => {
  let service: MessageService;

  async function createMessageId(messageDto = defaultMessage()) {
    const createdMessage = await service.create(messageDto);
    return createdMessage._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MessageDBModule, RedisModule],
      providers: [MessageService],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be create message', async() => {
    const messageDto = createMessage()
    const createdMessage = await service.create(messageDto)
    expect(createdMessage).toBeDefined();
    expect(createdMessage.text).toBe(messageDto.text)
  });

  it('should be update message by id', async() => {
    const messageDto = messageTest();
    const messageById = await createMessageId(messageDto);
    const updatedMessage = await service.update(messageById, updateMessage());
    expect(updatedMessage.text).toBeTruthy();
  });

  it('should be remove message by id', async() => {
    const deletedMessageId = messageIdFixture;
    const result = await service.remove(deletedMessageId)
    expect(result).toBeDefined() 
  });

  it('should be get message by id', async() => {
    const messageDto = defaultMessage();
    const messageById = await createMessageId(messageDto)
    const findMessageId = await service.findOne(messageById)
    expect(findMessageId.text).toBe(messageDto.text)
  });

  it('should be get all message', async() => {
    const allMessage = await service.findAll();
    expect(allMessage.length).toBeGreaterThan(0);
  });

  afterEach(async () => {
    await service.deleteMessageByText(defaultTextMessage);
  });
});

