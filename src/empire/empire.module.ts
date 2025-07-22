import { Module } from '@nestjs/common';
import { EmpireService } from './empire.service';
import { EmpireController } from './empire.controller';

@Module({
    providers: [EmpireService],
    controllers: [EmpireController]
})

export class EmpireModule {}
