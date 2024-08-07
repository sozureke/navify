import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	Min
} from 'class-validator'

export class UpdateRaceDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	distance?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	running_time?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	average_cadence?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	average_pace?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	fastest_pace?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	slowest_pace?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	elevation_gain?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	elevation_loss?: number

	@IsOptional()
	@IsInt()
	@Min(0)
	average_hr?: number
}
