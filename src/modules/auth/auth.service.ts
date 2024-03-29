import { TokenService } from './../token/token.service';
import { UserLoginDto } from './dto/index';
import { AppError } from './../../common/constants/errors';
import { CreateUserDTO } from './../users/dto/index';
import { UsersService } from './../users/users.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthUserResponse } from './response/index';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UsersService,
        private readonly tokenService: TokenService
        ) {}

    async registerUsers (dto: CreateUserDTO): Promise<CreateUserDTO> {
        try{
            const existUserEmail = await this.userService.findByUserEmail(dto.email)
            if (existUserEmail) throw new BadRequestException(AppError.USER_EMAIL_EXIST)
            const existUserName = await this.userService.findByUserName(dto.userName)
            if (existUserName) throw new BadRequestException(AppError.USER_USERNAME_EXIST)
            return this.userService.createUser(dto) 
        } catch (e) {
            throw new Error(e)
        }
    }

    async loginUser (dto: UserLoginDto): Promise<AuthUserResponse> {
        try {
            const existUser = await this.userService.findByUserEmail(dto.email)
            if (!existUser) throw new BadRequestException(AppError.USER_NOT_FOUND)
            const validatePassword = await bcrypt.compare(dto.password, existUser.password)
            if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)
            const user = await this.userService.publicUser(dto.email)
            const token = await this.tokenService.generateJwtToken(user)
            return {user, token}
        } catch (e){
            throw new Error(e)
        }
    }
}