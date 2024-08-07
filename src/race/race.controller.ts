import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { Race } from '@prisma/client'
import { CreateRaceDto } from './dto/create.dto'
import { UpdateRaceDto } from './dto/update.dto'
import { sortByParameters } from './interface/sort.interface'
import { RACE_MESSAGES } from './race.messages'
import { RaceService } from './race.service'

@Controller('race')
export class RaceController {
	constructor(private raceService: RaceService) {}

	@Post()
	async createRace(
		@Body() dto: CreateRaceDto
	): Promise<{ message: string; data: Race }> {
		const race = await this.raceService.createRace(dto)
		return { message: RACE_MESSAGES.RACE_CREATED, data: race }
	}

	@Put(':id')
	async updateRace(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateRaceDto
	): Promise<{ message: string; data: Race }> {
		const updatedRace = await this.raceService.updateRace(id, dto)
		return { message: RACE_MESSAGES.RACE_UPDATED, data: updatedRace }
	}

	@Delete(':id')
	async deleteRace(
		@Param('id', ParseIntPipe) id: number
	): Promise<{ message: string; data: Race }> {
		const deletedRace = await this.raceService.deleteRace(id)
		return { message: RACE_MESSAGES.RACE_DELETED, data: deletedRace }
	}

	@Delete('all/:userId')
	async deleteAllRaces(
		@Param('userId', ParseIntPipe) userId: number
	): Promise<{ message: string; deletedRecordsCount: number }> {
		const deletedRaces = await this.raceService.deleteAllRaces(userId)
		return {
			message: RACE_MESSAGES.ALL_RACES_DELETED,
			deletedRecordsCount: deletedRaces.length
		}
	}

	@Get(':id')
	async getRaceById(
		@Param('id', ParseIntPipe) id: number
	): Promise<{ message: string; data: Race }> {
		const race = await this.raceService.getRace(id)
		return { message: RACE_MESSAGES.GET_RACE, data: race }
	}

	@Get('pagination/:userId')
	async getRacesWithPagination(
		@Param('userId', ParseIntPipe) userId: number,
		@Query('take', ParseIntPipe) take: number
	): Promise<{ message: string; data: Race[] }> {
		const races = await this.raceService.getRacesWithPagination(userId, take)
		return { message: RACE_MESSAGES.GET_RACES, data: races }
	}

	@Get('all/:userId')
	async getRaces(
		@Param('userId', ParseIntPipe) userId: number
	): Promise<{ message: string; data: Race[] }> {
		const races = await this.raceService.getAllRaces(userId)
		return { message: RACE_MESSAGES.GET_RACES, data: races }
	}

	@Get('sorted/:userId')
	async sortRacesByParameter(
		@Param('userId', ParseIntPipe) userId: number,
		@Query('sortBy') sortBy: sortByParameters,
		@Query('sortOrder') sortOrder: 'asc' | 'desc'
	): Promise<{ message: string; data: Race[] }> {
		const sortedRaces = await this.raceService.sortRacesByParameter(
			sortBy,
			userId,
			sortOrder
		)

		return { message: RACE_MESSAGES.GET_RACES, data: sortedRaces }
	}
}
