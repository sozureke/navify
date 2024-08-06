import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Navify')
	.setDescription('Navify API')
	.setVersion('1.0')
	.addTag('navify')
	.build()
