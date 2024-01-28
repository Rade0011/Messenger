import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageDBModule } from './message.db';
import { messageIdFixture, messageTest, removeMessage, defaultMessage } from './message.fixture';
import { RedisModule } from '../Redis/redis.module';


describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MessageDBModule, RedisModule],
      controllers: [MessageController],
      providers: [MessageService],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService)
  });

  // it('create Message', async() => {
  //   const createdMessage = messageTest();
  //   jest.spyOn(service, 'create').mockImplementation(async () => createdMessage)
  //   expect(await controller.create(createdMessage)).toBe(createdMessage);
  // });

  it('update message by id', async() => {
    const id = messageIdFixture;
    const createdMessage = messageTest().toString()
    jest.spyOn(service, 'update').mockImplementation(async () => createdMessage);
    expect(await controller.update(createdMessage, id as any)).toBe(createdMessage)
  });

  it('remove message by id', async() => {
    const id = messageIdFixture;
    const deletedMessage = removeMessage()
    jest.spyOn(service, 'remove').mockImplementation(async () => deletedMessage);
    expect(await controller.remove(id)).toBe(deletedMessage)
  });

  it('find all messages', async() => {
    const findAllMessage = await service.findAll();
    jest.spyOn(service, 'findAll').mockImplementation(async () => findAllMessage);
    expect(await controller.findAll()).toBeInstanceOf(Array)
  });

  it('find chat by id', async() => {
    const id = messageIdFixture;
    const message = defaultMessage();
    jest.spyOn(service, 'findOne').mockImplementation(async () => message);
    expect(await controller.findOne(id)).toBe(message)
  });
});
