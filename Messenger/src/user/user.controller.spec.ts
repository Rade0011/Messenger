import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDBModule } from './user.db';
import { removeUser, userIdFixture, userTest, defaultUser } from './user.fixtures';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDBModule],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('create User', async() => {
    const createdUser = userTest();
    jest.spyOn(service, 'create').mockImplementation(async () => createdUser);
    expect(await controller.create(createdUser)).toBe(createdUser);
  });

  it('update chat by id', async() => {
    const id = userIdFixture;
    const createdUser = userTest().toString()
    jest.spyOn(service, 'update').mockImplementation(async () => createdUser);
    expect(await controller.update(createdUser, id as any)).toBe(createdUser)
  });

  it('remove chat by id', async() => {
    const id = userIdFixture;
    const deletedUser = removeUser()
    jest.spyOn(service, 'remove').mockImplementation(async () => deletedUser);
    expect(await controller.remove(id)).toBe(deletedUser)
  });

  // it('find all users', async() => {
  //   const findAllUser = await service.findAll();
  //   jest.spyOn(service, 'findAll').mockImplementation(async () => findAllUser);
  //   expect(await controller.findAll()).toBeInstanceOf(Array)
  // });

  it('find chat by id', async() => {
    const id = userIdFixture;
    const user = defaultUser();
    jest.spyOn(service, 'findOne').mockImplementation(async () => user);
    expect(await controller.findOne(id)).toBe(user)
  });
});
