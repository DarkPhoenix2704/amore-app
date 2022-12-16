import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Department, Interest, Pronoun } from '@prisma/client';

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
    pronoun: Pronoun;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    partnerPronoun: Pronoun;

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

    @ApiProperty()
    @IsArray()
    interests: Array<string>;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    collegeId: string;
}
