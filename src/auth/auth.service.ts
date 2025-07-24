import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RegisterDto } from './dtos/auth.register';
import * as bcrypt from "bcrypt"
import { LoginDto } from './dtos/auth.login';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

    async register(registerData: RegisterDto) {

        const {username ,email, password} = registerData

        const hashPassword = bcrypt.hashSync(password, 10)

        return this.prismaService.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword
            }
        })

    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }>{

        const {email, password} = loginDto;

        const user = await this.prismaService.user.findUnique({where: {
            email: email
        }})

        if (!user || !user.password) {
            throw new UnauthorizedException('Usuário não encontrado ou senha ausente');
          }
          
        const isPasswordValid = await bcrypt.compare(password, user.password);
          
        if (!isPasswordValid) {
            throw new UnauthorizedException('Senha incorreta');
        }

        const payload = {sub: user.id, username: user.username, email: user.email}

        return {
            access_token: await this.jwtService.signAsync(payload),
        };

        
    }
    
}
