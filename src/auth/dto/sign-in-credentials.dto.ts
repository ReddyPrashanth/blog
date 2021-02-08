import {IsEmail, IsString, IsNotEmpty, MinLength} from 'class-validator';

export class SignInCredentialsDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;
}