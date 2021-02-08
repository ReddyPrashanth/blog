import { PostgresErrorCode } from './../database/postgres-error-code.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from "typeorm"
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(createUserDto: CreateUserDto):Promise<User> {
        const {password, email} = createUserDto;
        const user = this.create(createUserDto);
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
            return user;
        }catch (error){
            if(error?.code === PostgresErrorCode.UniqueViolation){
                throw new HttpException(`User with email: ${email} is taken`, HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signin(authCredentialsDto: AuthCredentialsDto): Promise<User | null> {
        const {email, password} = authCredentialsDto;
        const user = await this.findOne({email});
        if(user && await user.validatePassword(password)){
            return user;
        }else{
            return null;
        }
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
 }