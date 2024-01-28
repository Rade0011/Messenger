import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserDBModule } from './user.db';
import { defaultUser, defaultUserName, updateUser, userIdFixture, userTest } from './user.fixtures';



describe('UserService', () => {
  let service: UserService;

  async function createUserId(userDto = defaultUser()) {
    const createdUser = await service.create(userDto);
    return createdUser._id.toString();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserDBModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user', async () => {
    const userDto = defaultUser()
    const createdUser = await service.create(userDto)
    expect(createdUser).toBeDefined();
    expect(createdUser.username).toBe(userDto.username)
  });

  it('should be update user', async () => {
    const userDto = userTest();
    const userById = await createUserId(userDto);
    const updatedUser = await service.update(userById, updateUser());
    expect(updatedUser.phoneNumber).toBe(userDto.phoneNumber)
  });

  it('should be remove user by id', async () => {
    const deletedChat = userIdFixture;
    const result = await service.remove(deletedChat)
    expect(result).toBeDefined()
  });

  it('should be get user by id', async () => {
    const userDto = defaultUser();
    const userById = await createUserId(userDto)
    const findUserId = await service.findOne(userById)
    expect(findUserId.username).toEqual(userDto.username)
  });

  afterEach(async () => {
    await service.deleteUserByName(defaultUserName);
    await service.deleteUserByName(updateUser.toString());
  });
 });

