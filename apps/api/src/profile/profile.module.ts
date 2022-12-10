import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [PrismaModule],
})
export class ProfileModule {}
