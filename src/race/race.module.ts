import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RaceController } from './race.controller'
import { RaceService } from './race.service'

@Module({
	providers: [RaceService, PrismaService],
	controllers: [RaceController]
})
export class RaceModule {}
