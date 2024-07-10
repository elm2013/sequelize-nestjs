import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class AuthModel {
    @IsPhoneNumber('IR')
    @ApiProperty({ required: true })
    mobile: string;

    @IsString()
    @MinLength(8)
    @IsAlphanumeric()
    @ApiProperty({ required: true })
    password: string;
}
