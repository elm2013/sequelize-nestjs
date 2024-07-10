import { Injectable, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { User as UserEntity } from './../user/user.entity';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { AuthModel } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RigisterUserDto as UserModel } from './dto/rigister.dto'
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
        return await this.userService.findById(payload.id);
    }

    async authenticate(auth: AuthModel) {
        try {
            const user = await this.userService.findByPhoneWithPassword(auth.mobile);


            if (!user) {
                throw new BadRequestException("No user found with this username");
            }



            if (!await this.userService.compareHash(auth.password, user.password)) {
                throw new BadRequestException('The password or username is wrong. ');
            }
            const token = await this.createToken(user);
            return { user, token }

        } catch (error) {
            console.log("errore in authenticate: ", error);

        }


    }
    async rigister(userModel: UserModel) {
        try {
            const mobileExists = await this.userService.findByPhone(userModel.mobile);

            if (mobileExists) {
                throw new UnprocessableEntityException("This number is already available.");
            }

            const user = await this.userService.create(userModel);


            const token = await this.createToken(user);
            return { user, token }
        } catch (error) {
            console.log("errore in rigister: ", error);
        }

    }

    async createToken(user) {
        let accessTokenOptions: any = {
            expiresIn: process.env.EXPIRESIN,
            algorithm: process.env.ALGORITHM,
            secret: process.env.SECRET_KEY
        };
        let payload = { id: user.id }

        const token = await this.jwtService.signAsync(payload, accessTokenOptions);

        return token
    }
}
