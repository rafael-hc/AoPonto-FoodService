/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'dotenv/config'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { cleanupOpenApiDoc, ZodValidationPipe } from 'nestjs-zod'
import { AppModule } from './modules/app.module'
import { HttpExceptionFilter } from './modules/shared/presentation/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(helmet())
  const frontendUrls = process.env.FRONTEND_URL?.split(',') || [
    'http://localhost:4200'
  ]
  app.enableCors({
    origin: frontendUrls,
    credentials: true
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ZodValidationPipe())

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const config = new DocumentBuilder()
    .setTitle('AoPonto FoodService API')
    .setDescription('Documentação da API do sistema AoPonto')
    .setVersion('1.0')
    .setOpenAPIVersion('3.1.0')
    .addBearerAuth()
    .addTag('users')
    .addTag('session')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  cleanupOpenApiDoc(document)

  // Patch para compatibilidade com OpenAPI 3.0.0 (converte anyOf com type: null para nullable: true)
  const patchSchemas = (obj: Record<string, unknown>) => {
    if (!obj || typeof obj !== 'object') return
    for (const key in obj) {
      const val = obj[key] as Record<string, unknown>
      if (val && typeof val === 'object') {
        if (val.anyOf && Array.isArray(val.anyOf)) {
          const types = val.anyOf
            .map((item: Record<string, unknown>) => item.type as string)
            .filter(Boolean)
          const hasNull = val.anyOf.some(
            (item: Record<string, unknown>) => item.type === 'null'
          )
          if (hasNull && types.length > 0) {
            const nonNullType = types.find((t: string) => t !== 'null')
            if (nonNullType) {
              delete val.anyOf
              val.type = nonNullType
              val.nullable = true
            }
          }
        }
        patchSchemas(val)
      }
    }
  }

  if (document.components?.schemas) {
    patchSchemas(document.components.schemas as Record<string, unknown>)
  }

  // Exportar o Swagger JSON para a raiz do workspace para facilitar Orval/DevOps
  const rootPath = join(__dirname, '../../..')
  writeFileSync(
    join(rootPath, 'swagger.json'),
    JSON.stringify(document, null, 2)
  )
  Logger.log(`📝 Swagger JSON exported to: ${join(rootPath, 'swagger.json')}`)

  SwaggerModule.setup('docs', app, document) // Acessível em /api/docs

  const port = process.env.PORT || 3000
  await app.listen(port)
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  )
}

bootstrap()
