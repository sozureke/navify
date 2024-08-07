import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min
} from 'class-validator'

export class CreateRaceDto {
	@IsInt()
	userId: number

	@IsString()
	@IsNotEmpty()
	name: string

	@IsNumber()
	@Min(0)
	distance: number

	@IsInt()
	@Min(0)
	running_time: number

	@IsInt()
	@Min(0)
	@IsOptional()
	average_cadence?: number

	@IsNumber()
	@Min(0)
	@IsOptional()
	average_pace?: number

	@IsNumber()
	@Min(0)
	@IsOptional()
	fastest_pace?: number

	@IsNumber()
	@Min(0)
	@IsOptional()
	slowest_pace?: number

	@IsInt()
	@Min(0)
	@IsOptional()
	elevation_gain?: number

	@IsInt()
	@Min(0)
	@IsOptional()
	elevation_loss?: number

	@IsInt()
	@Min(0)
	@IsOptional()
	average_hr?: number
}
