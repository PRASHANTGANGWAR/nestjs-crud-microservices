import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@/dto/users.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiKeyGuard } from '@/guard/api-key.guard';
import { User } from '@models/users';

describe('UserController', () => {
    let controller: UserController;
    let userService: jest.Mocked<UserService>;

    const mockUser: User = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(async () => {
        const mockUserService: Partial<jest.Mocked<UserService>> = {
            create: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        })
            .overrideGuard(ApiKeyGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<UserController>(UserController);
        userService = module.get(UserService) as jest.Mocked<UserService>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a user successfully', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phoneNumber: '1234567890',
            };

            userService.create.mockResolvedValue(mockUser);

            const result = await controller.create(createUserDto);

            expect(result).toEqual({
                status: HttpStatus.CREATED,
                message: 'User created successfully',
                data: mockUser,
            });
            expect(userService.create).toHaveBeenCalledWith(createUserDto);
        });

        it('should handle creation errors', async () => {
            const createUserDto: CreateUserDto = {
                firstName: 'John',
                lastName: 'Doe',
                email: 'invalid-email',
                phoneNumber: '1234567890',
            };

            userService.create.mockRejectedValue(new Error('Validation error'));

            await expect(controller.create(createUserDto)).rejects.toThrow(HttpException);
        });
    });

    describe('getUserById', () => {
        it('should return a user when found', async () => {
            userService.findById.mockResolvedValue(mockUser);

            const result = await controller.getUserById(1);

            expect(result).toEqual({
                success: true,
                message: 'User fetched successfully',
                data: mockUser,
            });
            expect(userService.findById).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when user not found', async () => {
            userService.findById.mockResolvedValue(null as unknown as User);

            await expect(controller.getUserById(999)).rejects.toThrow(NotFoundException);
            expect(userService.findById).toHaveBeenCalledWith(999);
        });
    });

    describe('updateUserById', () => {
        const updateUserDto: UpdateUserDto = {
            firstName: 'Updated',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890',
        };

        it('should update a user successfully', async () => {
            const updatedUser = { ...mockUser, ...updateUserDto };
            userService.updateById.mockResolvedValue(updatedUser);

            const result = await controller.updateUserById(1, updateUserDto);

            expect(result).toEqual({
                success: true,
                message: 'User updated successfully',
                data: updatedUser,
            });
            expect(userService.updateById).toHaveBeenCalledWith(1, updateUserDto);
        });

        it('should handle partial updates', async () => {
            const partialUpdate = { firstName: 'UpdatedName' };
            const updatedUser = { ...mockUser, ...partialUpdate };
            userService.updateById.mockResolvedValue(updatedUser);

            const result = await controller.updateUserById(
                1,
                partialUpdate as UpdateUserDto
            );

            expect(result.data.firstName).toBe('UpdatedName');
        });

        it('should throw NotFoundException when user not found', async () => {
            userService.updateById.mockResolvedValue(null as unknown as User);

            await expect(controller.updateUserById(999, updateUserDto))
                .rejects.toThrow(NotFoundException);
            expect(userService.updateById).toHaveBeenCalledWith(999, updateUserDto);
        });
    });

    describe('deleteUserById', () => {
        it('should delete a user successfully', async () => {
            userService.deleteById.mockResolvedValue(mockUser);

            const result = await controller.deleteUserById(1);

            expect(result).toEqual({
                success: true,
                message: 'User deleted successfully',
                data: mockUser,
            });
            expect(userService.deleteById).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when user not found', async () => {
            userService.deleteById.mockResolvedValue(null as unknown as User);

            await expect(controller.deleteUserById(999)).rejects.toThrow(NotFoundException);
            expect(userService.deleteById).toHaveBeenCalledWith(999);
        });
    });
});