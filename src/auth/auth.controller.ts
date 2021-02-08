import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { LocalAuthGuard } from './local-auth-guard';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, Request, Response, UseGuards, UseInterceptors } from '@nestjs/common';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signup')
    async signup(@Body() registerDto: RegisterDto) {
        return await this.authService.signup(registerDto);
    }

    @Post('/signin')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async signin(@Request() req: RequestWithUser){
        const user = req.user;
        const cookie = this.authService.getCookieWithJwtAccessToken(user.id);
        req.res.setHeader('Set-Cookie', cookie);
        return user;
    }

    @Post('/logout')
    @HttpCode(200)
    async logout(@Request() request) {
        request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    }

    @Get('')
    @UseGuards(JwtAuthGuard)
    authenticate(@Request() request: RequestWithUser) {
        const user = request.user;
        return user;
    }
}
