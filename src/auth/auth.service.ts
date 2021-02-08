import { ConfigService } from '@nestjs/config';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) {}

    async signup(registerDto: RegisterDto): Promise<User> {
        return await this.userService.createUser(registerDto);
    }

    async signin(signInCredentialsDto: SignInCredentialsDto): Promise<User> {
        return await this.userService.signin(signInCredentialsDto);
    }

    getCookieWithJwtAccessToken(userId: number) {
        const tokenPayload: JwtPayload = {userId};
        const token = this.jwtService.sign(tokenPayload);
        const cookie = `Authentication=${token}; httpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
        return cookie;
    }

    getCookieForLogout() {
        return `Authentication=; Path=/; Max-Age=0`;
    }
}
