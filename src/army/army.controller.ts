import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ArmyService } from './army.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('troops')
export class ArmyController {

    constructor(private readonly troopService: ArmyService) {}

    @Get(":empireName")
    async getAllTroops(@Param("empireName") empireName, @Request() req) {

        return this.troopService.getAllTroops(empireName, req.user.id)

    }

    @Post(":empireName/:troopType/:amount")
    async postTroops(@Param("empireName") empireName, @Param("troopType") troopType,@Param("amount") amount, @Request() req) {

        return this.troopService.postTroops(empireName, req.user.id, troopType, amount)

    }

}
