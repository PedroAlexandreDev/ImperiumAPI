import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { ArmyService } from './army.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('troops')
export class ArmyController {

    constructor(private readonly troopService: ArmyService) {}

    @Get(":empireName")
    async GetAllTroops(@Param("empireName") empireName, @Request() req) {

        return this.troopService.getAllTroops(empireName, req.user.id)

    }

}
