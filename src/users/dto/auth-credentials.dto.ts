
import {IsEmail, IsString, IsNotEmpty, MinLength} from 'class-validator';

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}