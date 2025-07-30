import { Get, Injectable, NotFoundException } from '@nestjs/common';
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

    async postTroops(empireName: string, userId: string) {

        

    }

}
