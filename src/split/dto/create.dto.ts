import { IsNotEmpty, IsNumber, Min } from 'class-validator'

export class CreateSplitDto {
	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	distance: number

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	time: number

	@IsNotEmpty()
	@IsNumber()
	raceId: number
}
