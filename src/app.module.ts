import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma/prisma.service'
import { RaceModule } from './race/race.module'
import { RouteModule } from './route/route.module'
import { SplitController } from './split/split.controller'
import { SplitModule } from './split/split.module'
import { StatisticModule } from './statistic/statistic.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		RouteModule,
		AuthModule,
		UserModule,
		RaceModule,
		SplitModule,
		StatisticModule
	],
	controllers: [SplitController],
	providers: [PrismaService]
})
export class AppModule {}
