import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Route, RoutePoint } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateRoutePointDto } from './dto/create-route-point.dto'
import { CreateRouteDto } from './dto/create-route.dto'
import { ROUTE_MESSAGES } from './route.message'

@Injectable()
export class RouteService {
	constructor(private readonly prisma: PrismaService) {}

	async createRoute(dto: CreateRouteDto): Promise<Route | null> {
		const existingRoute = await this.prisma.route.findUnique({
			where: { raceId: dto.raceId }
		})
		if (existingRoute) {
			throw new ConflictException('Route with this raceId already exists')
		}

		const route = await this.prisma.route.create({
			data: {
				raceId: dto.raceId,
				name: dto.name
			}
		})
		return route
	}

	async updateRoute(
		id: number,
		dto: CreateRoutePointDto
	): Promise<Route | null> {
		const route = await this.prisma.route.findUnique({ where: { id } })
		if (!route) throw new NotFoundException(ROUTE_MESSAGES.ROUTE_NOT_FOUND)
		const routePoint = this.createRoutePoint(id, dto)
		if (routePoint)
			await this.prisma.route.update({
				where: { id },
				data: { points: { connect: { id: (await routePoint).id } } }
			})

		return route
	}

	async deleteRoute(id: number): Promise<Route | null> {
		const route = await this.prisma.route.findUnique({ where: { id } })
		if (!route) throw new NotFoundException(ROUTE_MESSAGES.ROUTE_NOT_FOUND)
		return this.prisma.route.delete({ where: { id } })
	}

	async createRoutePoint(
		routeId: number,
		dto: CreateRoutePointDto
	): Promise<RoutePoint | null> {
		const route = await this.prisma.route.findUnique({
			where: { id: routeId }
		})
		if (!route) throw new NotFoundException(ROUTE_MESSAGES.ROUTE_NOT_FOUND)
		return this.prisma.routePoint.create({
			data: {
				routeId: routeId,
				latitude: dto.latitude,
				longitude: dto.longitude
			}
		})
	}
}
