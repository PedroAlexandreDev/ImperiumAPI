import { Injectable, NotFoundException, Req, UnauthorizedException } from '@nestjs/common';
import { EmpireDto } from './dtos/createEmpireDto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmpireService {

    constructor (private readonly prismaService: PrismaService) {}

    async getAllEmpires(userId: string) {

        return this.prismaService.empire.findMany({
            where: {
                userId: userId,
            }
        })

    }

    async createEmpire(empireData: EmpireDto, userId: string) {
        if (!userId) {
          throw new UnauthorizedException("Sem ID de usuário");
        }
    
        const user = await this.prismaService.user.findUnique({
          where: { id: userId },
        });
    
        if (!user) {
          throw new NotFoundException("Usuário não encontrado");
        }
    
        return this.prismaService.empire.create({
          data: {
            name: empireData.name,
            user: {
              connect: { id: userId },
            },
          },
        });
      }
}
 