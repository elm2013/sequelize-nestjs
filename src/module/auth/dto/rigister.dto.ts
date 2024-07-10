// import { IsPhoneNumber } from '@nestjs/class-validator';
import { IsPhoneNumber, IsString, IsNotEmpty, MinLength, IsAlphanumeric, IsAlpha, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RigisterUserDto {
    readonly id: number;

    @IsPhoneNumber('IR')
    @IsNotEmpty()
    @ApiProperty({ required: true })
    mobile: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsAlphanumeric()
    @ApiProperty({ required: true })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MaxLength(25)
    @ApiProperty({ required: true })
    firstName: string;

    @IsString()
    @ApiProperty({ required: false })
    @IsAlpha()
    @MaxLength(50)
    lastName: string;
}
