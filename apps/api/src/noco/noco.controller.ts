import { Controller, Get, Query } from '@nestjs/common';
import { NocoService } from './noco.service';

@Controller()
export class NocoController {
    constructor(private readonly nocoService: NocoService) {}

    @Get('college')
    async getCollegeName(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.nocoService.getCollegeName(search, limit, page);
    }

    @Get('interests')
    async getInterests(
        @Query('search') search: string,
        @Query('limit') limit: string,
        @Query('page') page: string,
    ) {
        return this.nocoService.getInterests(search, limit, page);
    }
}
