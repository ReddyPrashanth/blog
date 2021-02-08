import { User } from 'src/users/user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import * as request from 'supertest';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_SECRET')
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const {userId} = payload;
        const user = await this.usersService.getById(userId);
        return user;
    }
}