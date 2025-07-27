import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('resources')
export class ResourcesController {

    constructor(private readonly resourcesService: ResourcesService) {}

    @Get(":empireName")
    async getResources(@Param("empireName") empireName: string, @Request() req) {

        return this.resourcesService.getResources(empireName, req.user.id)

    }

    @Post(":empireName/collect")
    async collectResources(@Param("empireName") empireName: string, @Request() req) {

        const userId = req.user.id 

        return this.resourcesService.collectResources(empireName, userId)

    }

}
