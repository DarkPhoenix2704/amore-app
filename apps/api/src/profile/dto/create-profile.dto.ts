import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Department, Gender } from '@prisma/client';

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mobile: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    bio: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    dob: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pronoun: Gender;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    partnerPronoun: Gender;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    passYear: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    department: Department;

    @ApiProperty()
    @IsBoolean()
    isVerified: boolean;
}
