import { UserLoginDto } from './dto/index';
import { CreateUserDTO } from './../users/dto/index';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthUserResponse } from './response/index';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiResponse({ status: 201, type: CreateUserDTO })
    @Post('register')
    register (@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
        return this.authService.registerUsers(dto)
    }

    @ApiTags('API')
    @ApiResponse({ status: 200, type: AuthUserResponse })
    @Post('login')
    login (@Body() dto: UserLoginDto): Promise<AuthUserResponse> {
        return this.authService.loginUser(dto)
    }
}