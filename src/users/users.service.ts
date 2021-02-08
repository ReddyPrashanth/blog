import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const signedUser = await this.userRepository.signin(authCredentialsDto);
        if(signedUser){
            return signedUser;
        }
        throw new UnauthorizedException('Incorrect user credentials');
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.createUser(createUserDto);
        return user;
    }

    async getById(userId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if(user) {
            return user;
        }
        throw new UserNotFoundException(userId);
    }
}
