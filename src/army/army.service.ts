import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { TroopType } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ArmyService {

    constructor(private readonly prismaService: PrismaService) {}

    async getAllTroops(empireName: string, userId: string) {
    
        const empire = await this.prismaService.empire.findFirst({

            where: {

                name: empireName,
                userId: userId

            }

        })

        if (!empire) {
            throw new NotFoundException("Império não encontrado");
        }

        return this.prismaService.troop.findMany({

            where: {

                empireId: empire.id,

            }

        })

    }

    async postTroops(empireName: string, userId: string, type: TroopType, amount: number) {

        const empire = await this.prismaService.empire.findFirst({

          where: { name: empireName, userId },
          
        });
      
        if (!empire) throw new Error('Império não encontrado');
      
        const troopCosts = {
          INFANTRY: { FOOD: 100, GOLD: 50, WOOD: 20 },
          ARCHER: { FOOD: 80, GOLD: 70, WOOD: 40 },
          CAVALRY: { FOOD: 150, GOLD: 100, WOOD: 60 },
        };
      
        const cost = troopCosts[type];
        const totalCost = {
          FOOD: cost.FOOD * amount,
          GOLD: cost.GOLD * amount,
          WOOD: cost.WOOD * amount,
        };
      
        const resources = await this.prismaService.resource.findMany({
          where: { 
                empireId: empire.id, 
            },
        });
      
        const resourceMap = Object.fromEntries(resources.map(r => [r.type, r]));
      
        for (const resType of ['FOOD', 'GOLD', 'WOOD']) {
          if (!resourceMap[resType] || resourceMap[resType].amount < totalCost[resType]) {
            throw new Error(`Recursos insuficientes: ${resType}`);
          }
        }
      
        for (const resType of ['FOOD', 'GOLD', 'WOOD']) {
          await this.prismaService.resource.update({
            where: { id: resourceMap[resType].id },
            data: {
              amount: {
                decrement: totalCost[resType],
              },
            },
          });
        }
      
        const Troop = await this.prismaService.troop.findFirst({
          where: {
            empireId: empire.id,
            type,
          },
        });

        if (!Troop) {

            throw new NotFoundException("tropas nao encontradas");

        }
      
        await this.prismaService.troop.update({
            where: { id: Troop.id },
            data: {
              amount: {
                increment: amount,
              },
            },
          });

      
        return { message: 'Tropas recrutadas com sucesso',  totalCost };
      }
      
}
