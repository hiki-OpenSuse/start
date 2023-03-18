import { Watchlist } from './../watchlist/models/watchlist.model';
import { CreateUserDTO, UpdateUserDto } from './dto/index';
import { User } from './models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

    async hashPassword (password) {
        return bcrypt.hash(password, 10)
    }

    async findByUserEmail (email: string) {
        return this.userRepository.findOne({where: { email } });
    }

    async findByUserName (userName: string) {
        return this.userRepository.findOne({ where: { userName } })
    }

    async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
        dto.password = await this.hashPassword(dto.password)
        await this.userRepository.create({
            firstName: dto.firstName,
            userName: dto.userName,
            email: dto.email,
            password: dto.password
        })
        return dto
    }

    async publicUser (email: string) {
        return this.userRepository.findOne({
            where: { email },
            attributes: { exclude: ['password'] },
            include: {
                model: Watchlist,
                required: false
            } 
        })
    }

    async updateUser (email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
        await this.userRepository.update(dto, { where: { email } })
        return dto
    }

    async deleteUser (email: string): Promise<boolean> {
        await this.userRepository.destroy({ where: { email } })
        return true
    }
}