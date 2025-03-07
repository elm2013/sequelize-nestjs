import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService, ...UserProviders
    ],
    exports: [UserService]
})
export class UserModule { }