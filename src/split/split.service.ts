import { Injectable, NotFoundException } from '@nestjs/common'
import { Split } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { RACE_MESSAGES } from 'src/race/race.messages'
import { CreateSplitDto } from './dto/create.dto'
import { UpdateSplitDto } from './dto/update.dto'
import { SPLIT_MESSAGES } from './split.message'

@Injectable()
export class SplitService {
	constructor(private readonly prisma: PrismaService) {}

	async createSplit(dto: CreateSplitDto): Promise<Split | null> {
		const race = await this.prisma.race.findUnique({
			where: { id: dto.raceId }
		})
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)

		const split = await this.prisma.split.create({
			data: dto
		})
		await this.prisma.race.update({
			where: { id: dto.raceId },
			data: { splits: { connect: { id: split.id } } }
		})
		return split
	}

	async updateSplit(id: number, dto: UpdateSplitDto): Promise<Split | null> {
		const split = await this.prisma.split.findUnique({ where: { id } })
		if (!split) throw new NotFoundException(SPLIT_MESSAGES.SPLIT_NOT_FOUND)

		return this.prisma.split.update({ where: { id }, data: dto })
	}

	async deleteSplit(id: number): Promise<Split | null> {
		const split = await this.prisma.split.findUnique({ where: { id } })
		if (!split) throw new NotFoundException(SPLIT_MESSAGES.SPLIT_NOT_FOUND)
		return this.prisma.split.delete({ where: { id } })
	}

	async getSplitsByRaceId(raceId: number): Promise<Split[] | null> {
		const race = await this.prisma.race.findUnique({ where: { id: raceId } })
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)
		return this.prisma.split.findMany({
			where: { raceId },
			orderBy: { createdAt: 'desc' }
		})
	}

	async getSplitsPaginated(
		raceId: number,
		take: number
	): Promise<Split[] | null> {
		const race = await this.prisma.race.findUnique({ where: { id: raceId } })
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)

		return this.prisma.split.findMany({
			where: { raceId },
			orderBy: { createdAt: 'desc' },
			take
		})
	}

	async getSplitById(id: number): Promise<Split | null> {
		const split = await this.prisma.split.findUnique({
			where: { id },
			include: { race: true }
		})
		if (!split) throw new NotFoundException(SPLIT_MESSAGES.SPLIT_NOT_FOUND)
		if (!split.race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)
		return split
	}

	async countSplits(raceId: number): Promise<number> {
		const result = await this.getSplitsByRaceId(raceId)
		return result.length
	}
}
