import { Controller, Post, Body, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../User/user.service';
import { RigisterUserDto as UserModel } from './dto/rigister.dto'
import { AuthModel } from './dto/login.dto';





@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) { }

    @Post('/login')
    async login(@Body() auth: AuthModel) {
        return await this.authService.authenticate(auth);


    }

    @Post('/register')
    async register(@Body() userModel: UserModel) {
        return await this.authService.rigister(userModel);
    }
}
