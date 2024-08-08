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
import { Split } from '@prisma/client'
import { CreateSplitDto } from './dto/create.dto'
import { UpdateSplitDto } from './dto/update.dto'
import { SPLIT_MESSAGES } from './split.message'
import { SplitService } from './split.service'

@Controller('splits')
export class SplitController {
	constructor(private readonly splitService: SplitService) {}

	@Post()
	async createSplit(
		@Body() dto: CreateSplitDto
	): Promise<{ message: string; data: Split }> {
		const split = await this.splitService.createSplit(dto)
		return { message: SPLIT_MESSAGES.SPLIT_CREATED, data: split }
	}

	@Delete(':id')
	async deleteSplit(
		@Param('id', ParseIntPipe) id: number
	): Promise<{ message: string; data: Split }> {
		const deletedSplit = await this.splitService.deleteSplit(id)
		return { message: SPLIT_MESSAGES.SPLIT_DELETED, data: deletedSplit }
	}

	@Put(':id')
	async updateSplit(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateSplitDto
	): Promise<{ message: string; data: Split }> {
		const updatedSplit = await this.splitService.updateSplit(id, dto)
		return { message: SPLIT_MESSAGES.SPLIT_UPDATED, data: updatedSplit }
	}

	@Get('race/:raceId')
	async getSplitsByRaceId(
		@Param('raceId', ParseIntPipe) raceId: number
	): Promise<{ message: string; data: Split[] }> {
		const splits = await this.splitService.getSplitsByRaceId(raceId)
		return { message: SPLIT_MESSAGES.SPLITS_RECEIVED, data: splits }
	}

	@Get('race/pagination/:raceId')
	async getSplitsPaginated(
		@Param('raceId', ParseIntPipe) raceId: number,
		@Query('take', ParseIntPipe) take: number
	): Promise<{ message: string; data: Split[] }> {
		const paginatedSplits = await this.splitService.getSplitsPaginated(
			raceId,
			take
		)
		return { message: SPLIT_MESSAGES.SPLITS_RECEIVED, data: paginatedSplits }
	}

	@Get(':id')
	async getSplitById(
		@Param('id', ParseIntPipe) id: number
	): Promise<{ message: string; data: Split }> {
		const split = await this.splitService.getSplitById(id)
		return { message: SPLIT_MESSAGES.SPLIT_RECEIVED, data: split }
	}

	@Get('count/:raceId')
	async countSplits(
		@Param('raceId', ParseIntPipe) raceId: number
	): Promise<{ message: string; data: number }> {
		const result = await this.splitService.countSplits(raceId)
		return { message: SPLIT_MESSAGES.SPLIT_RECEIVED, data: result }
	}
}
