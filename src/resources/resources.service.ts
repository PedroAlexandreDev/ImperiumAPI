import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ResourcesService {

    constructor (private readonly prismaService: PrismaService) {}

    async getResources(empireName: string, userId: string) {

        const empire = await this.prismaService.empire.findFirst({
            where: {
              name: empireName,
              userId: userId,
            },
        })

        if (!empire) {
            throw new NotFoundException("Império não encontrado");
        }

        return this.prismaService.resource.findMany({
            where: { empireId: empire?.id }
        })
          

    }

    async collectResources(empireName: string, userId: string) {

        const empire = await this.prismaService.empire.findFirst({
            where: {
              name: empireName,
              userId: userId,
            },
        })

        if (!empire) {
            throw new NotFoundException("Império não encontrado");
        }

        const randomResources = {
            wood: Math.floor(Math.random() * 100) + 1,
            gold: Math.floor(Math.random() * 10) + 1,
            stone: Math.floor(Math.random() * 70) + 1,
          };

        await this.prismaService.resource.updateMany({
            where: {empireId: empire.id, type: "WOOD"},
            data: {amount: {increment: randomResources.wood}}
        })

        await this.prismaService.resource.updateMany({
            where: {empireId: empire.id, type: "STONE"},
            data: {amount: {increment: randomResources.stone}}
        })

        await this.prismaService.resource.updateMany({
            where: {empireId: empire.id, type: "GOLD"},
            data: {amount: {increment: randomResources.gold}}
        })

        return {
            message: "Recursos coletados com sucesso!",
            collected: randomResources,
        }

    }

}
