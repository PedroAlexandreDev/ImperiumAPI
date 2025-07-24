import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { EmpireModule } from './empire/empire.module';
import { ArmyModule } from './army/army.module';
import { ResourcesModule } from './resources/resources.module';
import { BuildingsModule } from './buildings/buildings.module';
import { ArmyService } from './army/army.service';
import { ArmyController } from './army/army.controller';
import { EmpireService } from './empire/empire.service';
import { EmpireController } from './empire/empire.controller';

@Module({
  imports: [AuthModule, ResourcesModule, BuildingsModule, ArmyModule, EmpireModule, DatabaseModule],
  controllers: [AppController, EmpireController, ArmyController],
  providers: [AppService, ArmyService, EmpireService],
})
export class AppModule {}
