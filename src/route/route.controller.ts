import {
	Body,
	Controller,
	Delete,
	Param,
	ParseIntPipe,
	Post,
	Put
} from '@nestjs/common'
import { Route, RoutePoint } from '@prisma/client'
import { CreateRoutePointDto } from './dto/create-route-point.dto'
import { CreateRouteDto } from './dto/create-route.dto'
import { ROUTE_MESSAGES } from './route.message'
import { RouteService } from './route.service'

@Controller('route')
export class RouteController {
	constructor(private readonly routeService: RouteService) {}
	@Post()
	async createRoute(
		@Body() dto: CreateRouteDto
	): Promise<{ message: string; data: Route }> {
		const route = await this.routeService.createRoute(dto)
		return { message: ROUTE_MESSAGES.ROUTE_CREATE, data: route }
	}

	@Post('point/:id')
	async createRoutePoint(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CreateRoutePointDto
	): Promise<{ message: string; data: RoutePoint }> {
		const routePoint = await this.routeService.createRoutePoint(id, dto)
		return { message: ROUTE_MESSAGES.ROUTE_POINT_CREATE, data: routePoint }
	}

	@Put(':id')
	async updateRoute(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CreateRoutePointDto
	): Promise<{ message: string; data: Route }> {
		const updatedRoute = await this.routeService.updateRoute(id, dto)
		return { message: ROUTE_MESSAGES.ROUTE_UPDATED, data: updatedRoute }
	}

	@Delete(':id')
	async deleteRoute(
		@Param('id', ParseIntPipe) id: number
	): Promise<{ message: string; data: Route }> {
		const deletedRoute = await this.routeService.deleteRoute(id)
		return { message: ROUTE_MESSAGES.ROUTE_DELETED, data: deletedRoute }
	}
}
