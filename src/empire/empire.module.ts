import { Module } from '@nestjs/common';
import { EmpireService } from './empire.service';
import { EmpireController } from './empire.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [EmpireService],
    controllers: [EmpireController]
})

export class EmpireModule {}
