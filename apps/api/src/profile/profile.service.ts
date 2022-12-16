import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateException } from './exception/create.exception';
import { UpdateException } from './exception/update.exception';

interface Resp {
    message: string;
    data?: unknown;
}

@Injectable()
export class ProfileService {
    constructor(private prismaService: PrismaService) {}

    // Response Handler
    Success(resp: Resp) {
        return {
            Success: true,
            message: resp.message,
            data: resp.data,
        };
    }

    // Method to CREATE a new profile
    async createUser(createProfileDto: CreateProfileDto) {
        const user = await this.getUserById(createProfileDto.id);
        const userByEmail = await this.getUserByEmail(createProfileDto.email);
        if (user.data != null) {
            throw new CreateException('User Exists');
        }
        if (userByEmail != null && userByEmail.data != null) {
            throw new CreateException('User with same email exists');
        }
        const interestArray = createProfileDto.interests.map((id: string) => ({
            id,
        }));
        console.log('interestArray', interestArray);
        const resp = await this.prismaService.user.create({
            data: {
                ...createProfileDto,
                interests: {
                    connect: interestArray,
                },
            },
        });

        return this.Success({
            data: resp,
            message: 'User was created succesfully',
        });
    }

    // Method to READ an existing profile
    async getUserById(id: string) {
        const resp = await this.prismaService.user.findFirst({
            where: {
                id,
            },
            include: {
                interests: true,
                college: true,
            },
        });
        return this.Success({
            data: resp,
            message: 'User info was read succesfully',
        });
    }

    // Method to READ an existing profile with Email
    async getUserByEmail(email: string | undefined) {
        if (typeof email === 'undefined') {
            return { data: null };
        }
        const resp = await this.prismaService.user.findFirst({
            where: {
                email,
            },
        });
        return this.Success({
            data: resp,
            message: 'User info was read succesfully',
        });
    }

    // Method to UPDATE an existing profile
    async updateUser(id: string, updateProfileDto: UpdateProfileDto) {
        const EmailResp = await this.getUserByEmail(updateProfileDto.email);
        if (EmailResp.data != null) {
            throw new UpdateException('Email exists');
        }
        let resp;
        if (updateProfileDto.interests === undefined) {
            resp = await this.prismaService.user.update({
                where: { id },
                //@ts-ignore
                data: updateProfileDto,
            });
        } else {
            const interestArray = updateProfileDto.interests.map((id: string) => ({
                id,
            }));
            resp = await this.prismaService.user.update({
                where: { id },
                data: {
                    ...updateProfileDto,
                    interests: {
                        connect: interestArray,
                    },
                },
            });
        }
        return this.Success({
            data: resp,
            message: 'User info was updated succesfully',
        });
    }
}
