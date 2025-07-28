import { Controller, Get, Param, Post,  Request,  UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BuildingsService } from './buildings.service';


@UseGuards(JwtAuthGuard)
@Controller('buildings')
export class BuildingsController {

    constructor (private readonly buildingService: BuildingsService) {}

    @Get(":empireName")
    async getBuildings(@Param("empireName") empireName, @Request() req) {

        return this.buildingService.getBuildings(empireName, req.user.id)

    }

    @Post(":empireName/:typeBuilding")
    async  buyBuilding(@Param(":empireName") empireName, @Param("typeBuilding") typeBuilding, @Request() req) {

        return this.buildingService.buyBuilding(empireName, req.user.id, typeBuilding)

    }

}
