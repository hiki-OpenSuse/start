import { users } from '../../moks';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    getUsers() {
        return users;
    }
}