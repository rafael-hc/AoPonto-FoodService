import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import type { Response } from 'express'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const isProduction = process.env.NODE_ENV === 'production'

    // Resposta base
    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null

    const message =
      typeof exceptionResponse === 'object' && exceptionResponse !== null
        ? (exceptionResponse as any).message || exception.message
        : exceptionResponse || exception.message || 'Internal server error'

    const responseBody: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message
    }

    // Se houver lógica de bloqueio, podemos injetar dados extras aqui no futuro
    if (exception.response?.lockUntil) {
      responseBody.lockUntil = exception.response.lockUntil
    }

    // Ocultar detalhes técnicos em produção
    if (!isProduction && status === HttpStatus.INTERNAL_SERVER_ERROR) {
      responseBody.error = exception.name
      responseBody.stack = exception.stack
    }

    response.status(status).json(responseBody)
  }
}
