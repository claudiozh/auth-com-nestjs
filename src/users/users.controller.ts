import { Body, Controller, Get, HttpService, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ResponseInterface } from 'src/response.interface';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() userDto: CreateUserDto): Promise<ResponseInterface> {
        const newUser = await this.usersService.create(userDto);

        return {
            success: true,
            message: 'Usuário cadastrado com sucesso',
            data: newUser
        }
    }

    @Get()
    async findAll(): Promise<ResponseInterface> {
        const users = await this.usersService.findAll();

        return {
            success: true,
            message: 'Lista de usuários',
            data: users
        }
    }

    @Get('user-auth')
    async userAuth(@Request() req: any): Promise<ResponseInterface> {
        const userAuth = req.user;

        return {
            success: true,
            message: 'Usuário autenticado',
            data: userAuth
        }
    }
}
