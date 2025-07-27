import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EmpireService } from './empire.service';
import { EmpireDto } from './dtos/createEmpireDto';

@UseGuards(JwtAuthGuard)
@Controller('empire')
export class EmpireController {

    constructor(private readonly empiresService: EmpireService) {}

    @Get()
    async getEmpires(
        @Request() req,
    ) {

        const userId = req.user.userId;

        return this.empiresService.getEmpires(userId)

    }

    @Post("new")
    async createEmpire(
        @Body() empireData: EmpireDto,
        @Request() req
    
    ) {

        const userId = req.user.userId;
        
        return  this.empiresService.createEmpire(empireData, userId)

    }

}
