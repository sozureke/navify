import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateRoutePointDto {
	@IsNumber()
	@IsNotEmpty()
	latitude: number

	@IsNumber()
	@IsNotEmpty()
	longitude: number
}
