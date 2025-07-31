import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BuildingType } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BuildingsService {

    constructor (private readonly prismaService: PrismaService) {}
    

    async getBuildings(empireName: string, userId: string) {

    const empire = await this.prismaService.empire.findFirst({
        where: {
            name: empireName,
            userId: userId,
        },
    })

    if (!empire) {
        throw new NotFoundException("Império não encontrado");
    }
    
    return this.prismaService.building.findMany({
        where: {

          empireId: empire.id

        }
    })

    }

    calculateBuildingCost(type: string, level: number) {
        const base = {
          FARM: { gold: 100},
          MINE: { gold: 150},
          BARRACKS: { gold: 200},
          WALL: { gold: 250},
        };
      
        const multiplier = 1 + level * 10;
      
        return {
          coins: Math.floor(base[type].gold * multiplier),           
        };
    }

    async buyBuilding(empireName: string, userId: string, buildingType: BuildingType) {

        const empire = await this.prismaService.empire.findFirst({
          where: { name: empireName, userId: userId },
        });
      
        if (!empire) {  
          throw new NotFoundException("Império não encontrado");
        }
        if (!Object.values(BuildingType).includes(buildingType)) {
            throw new BadRequestException("Tipo de construção inválido");
          }
      
        const building = await this.prismaService.building.findFirst({
          where: {
            empireId: empire.id,
            type: buildingType,
          },
        });
      
        if (!building) {
          throw new NotFoundException("Construção não encontrada");
        }
      
        const cost = this.calculateBuildingCost(buildingType, building.level);
      
        if (empire.coins < cost.coins) {
          throw new BadRequestException("Coins insuficientes");
        }
      
        await this.prismaService.$transaction([
          this.prismaService.empire.update({
            where: { id: empire.id },
            data: {
              coins: { decrement: cost.coins },
            },
          }),
          this.prismaService.building.update({
            where: { id: building.id },
            data: {
              level: { increment: 1 },
            },
          }),
        ]);
      
        return {
            message: "Construção comprada com sucesso!",
            newLevel: building.level + 1,
            cost,
        };      
    }

}
