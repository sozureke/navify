import { NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { swaggerConfig } from './config/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const document = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('api', app, document)
	app.setGlobalPrefix('api')
	await app.listen(4200)
}
bootstrap()
