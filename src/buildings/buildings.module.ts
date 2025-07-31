import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule],
  providers: [BuildingsService],
  controllers: [BuildingsController]
})
export class BuildingsModule {}
