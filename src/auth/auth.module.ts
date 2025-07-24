import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [

    DatabaseModule, 

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'fallback_local_dev',
      signOptions: { expiresIn: '30d' },
    }),

    PassportModule

  ],
  providers: [AuthService, JwtStrategy],  
  controllers: [AuthController]
})
export class AuthModule {}
