import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { SplitController } from './split.controller'
import { SplitService } from './split.service'

@Module({
	controllers: [SplitController],
	providers: [SplitService, PrismaService]
})
export class SplitModule {}
