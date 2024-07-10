import { Injectable, Inject } from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User
    ) { }

    async findById(id: number): Promise<User | null> {
        // return await this.userRepository.findOne({ where: { id: id } });
        return await this.userRepository.findByPk(id);
    }

    async getHash(password: string): Promise<string> {
        return await bcrypt.hash(password, 20);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async findByPhoneWithPassword(mobile: string): Promise<User> | null {
        return await this.userRepository.findOne(
            {
                where: { mobile: mobile },

            },

        );
    }

    async create(user): Promise<User> {
        user.password = await this.getHash(user.password);

        const result = await this.userRepository.create(user)

        delete result.password;
        return result;
    }



    async findByPhone(mobile: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                mobile,
            },
        });
    }
}