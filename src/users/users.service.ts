import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) { }

    async create(user: CreateUserDto): Promise<User> {
        return this.repository.save(user);
    }

    async findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
            where: { email: String(email) }
        });
    }
}
