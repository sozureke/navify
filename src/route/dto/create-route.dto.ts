import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateRouteDto {
	@IsNumber()
	@IsNotEmpty()
	raceId: number

	@IsString()
	@IsNotEmpty()
	name: string
}
