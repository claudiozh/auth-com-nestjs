import { Controller, Post, UnauthorizedException, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/login-user-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('auth/login')
    async login(@Body() user: LoginUserDto) {
        const userValid = await this.authService.validateUserByEmailAndPassword(user.email, user.password);

        if (userValid) {
            return await this.authService.createToken(user);
        }

        throw new UnauthorizedException();
    }
}
