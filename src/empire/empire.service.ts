import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EmpireDto } from './dtos/createEmpireDto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EmpireService {

    constructor (private readonly prismaService: PrismaService) {}

    async getEmpires(userId: string) {

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
    
      const empire = await this.prismaService.empire.create({
        data: {
          name: empireData.name,
          user: {
            connect: { id: userId },
          },
        },
      });
    
      await this.prismaService.resource.createMany({
        data: [
          { empireId: empire.id, type: "WOOD", amount: 0 },
          { empireId: empire.id, type: "STONE", amount: 0 },
          { empireId: empire.id, type: "GOLD", amount: 0 },
        ],
      });

      await this.prismaService.building.createMany({
        data: [
          { empireId: empire.id, type: "FARM", level:  0},
          { empireId: empire.id, type: "MINE", level:  0},
          { empireId: empire.id, type: "WALL", level: 0 },
          { empireId: empire.id, type: "BARRACKS", level: 0 },
        ],
      });

      await this.prismaService.troop.createMany({
        data: [
          { empireId: empire.id, type: "ARCHER", amount:  0},
          { empireId: empire.id, type: "CAVALRY", amount:  0},
          { empireId: empire.id, type: "INFANTRY", amount: 0 },
        ],
      });
    
      return empire;
      
    }
    
}
 