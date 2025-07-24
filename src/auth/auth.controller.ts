import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dtos/auth.register';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/auth.login';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("register")
    async register(
        @Body() registerData: RegisterDto
    ) {

        return this.authService.register(registerData)

    }

    @Post("login")
    async login(
        @Body() loginDto: LoginDto
    ) {

        return this.authService.login(loginDto)

    }

}
