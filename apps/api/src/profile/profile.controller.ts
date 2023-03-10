import { Controller, Post, Body, UseGuards, Session, Get, Req, Res, Patch } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionContainer } from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateException } from './exception/create.exception';
import { ReadException } from './exception/read.exception';
import { UpdateException } from './exception/update.exception';

@UseGuards(AuthGuard)
@Controller('users/profile')
export class ProfileController {
    constructor(private readonly profilesService: ProfileService) {}

    @Post()
    async createUser(
        @Res({ passthrough: true }) res: any,
        @Body() createProfileDto: CreateProfileDto,
        @Session() session: SessionContainer,
    ) {
        try {
            console.log('createProfileDto', createProfileDto);

            const authId = session.getUserId();
            const email = (await Passwordless.getUserById({ userId: authId }))!.email!;
            const createProfile = createProfileDto;
            createProfile.email = email;
            createProfile.id = authId;
            return await this.profilesService.createUser(createProfile);
        } catch (err) {
            throw new CreateException(err);
        }
    }

    @Get()
    async getUser(
        @Req() req: any,
        @Res({ passthrough: true }) res: any,
        @Session() session: SessionContainer,
    ) {
        let authId: string;
        try {
            authId = session.getUserId();
            return await this.profilesService.getUserById(authId);
        } catch (err) {
            throw new ReadException(err);
        }
    }

    @Patch()
    async updateUser(
        @Req() req: any,
        @Res({ passthrough: true }) res: any,
        @Body() updateProfileDto: UpdateProfileDto,
        @Session() session: SessionContainer,
    ) {
        let authId: string;
        try {
            authId = session.getUserId();
            return await this.profilesService.updateUser(authId, updateProfileDto);
        } catch (err) {
            throw new UpdateException(err);
        }
    }
}
