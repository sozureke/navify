import { IsNumber, IsOptional, Min } from 'class-validator'

export class UpdateSplitDto {
	@IsOptional()
	@IsNumber()
	@Min(0)
	distance: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	time: number

	@IsOptional()
	@IsNumber()
	raceId: number
}
