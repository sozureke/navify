import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RouteController } from './route.controller'
import { RouteService } from './route.service'

@Module({
	providers: [RouteService, PrismaService],
	controllers: [RouteController]
})
export class RouteModule {}
