import { Injectable, NotFoundException } from '@nestjs/common'
import { Race } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateRaceDto } from './dto/create.dto'
import { UpdateRaceDto } from './dto/update.dto'
import { sortByParameters } from './interface/sort.interface'
import { RACE_MESSAGES } from './race.messages'

@Injectable()
export class RaceService {
	constructor(private readonly prisma: PrismaService) {}

	async createRace(dto: CreateRaceDto): Promise<Race | null> {
		const user = await this.prisma.user.findUnique({
			where: { id: dto.userId }
		})
		if (!user) throw new NotFoundException(RACE_MESSAGES.USER_NOT_FOUND)
		return this.prisma.race.create({ data: dto })
	}

	async updateRace(id: number, dto: UpdateRaceDto): Promise<Race | null> {
		const race = await this.prisma.race.findUnique({ where: { id } })
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)
		return this.prisma.race.update({ where: { id }, data: dto })
	}

	async deleteRace(id: number): Promise<Race | null> {
		const race = await this.prisma.race.findUnique({ where: { id } })
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)
		return this.prisma.race.delete({ where: { id } })
	}

	async deleteAllRaces(userId: number): Promise<Race[] | null> {
		const races = await this.getAllRaces(userId)
		await this.prisma.race.deleteMany({ where: { userId } })
		return races
	}

	async getRace(id: number): Promise<Race | null> {
		const race = await this.prisma.race.findUnique({ where: { id } })
		if (!race) throw new NotFoundException(RACE_MESSAGES.RACE_NOT_FOUND)
		return race
	}

	async getRacesWithPagination(
		userId: number,
		take: number
	): Promise<Race[] | null> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new NotFoundException(RACE_MESSAGES.USER_NOT_FOUND)
		return this.prisma.race.findMany({
			where: { userId },
			take,
			orderBy: { date: 'desc' }
		})
	}

	async getAllRaces(userId: number): Promise<Race[] | null> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new NotFoundException(RACE_MESSAGES.USER_NOT_FOUND)
		return this.prisma.race.findMany()
	}

	async sortRacesByParameter(
		sortBy: sortByParameters,
		userId: number,
		sortOrder: 'asc' | 'desc'
	): Promise<Race[] | null> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw new NotFoundException(RACE_MESSAGES.USER_NOT_FOUND)
		return this.prisma.race.findMany({
			where: { userId },
			orderBy: { [sortBy]: sortOrder }
		})
	}
}
