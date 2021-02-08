import { object } from "@hapi/joi";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const res = exception.getResponse();
        const message = (typeof res === 'object')? res : {statusCode: status, message:res}
        response.status(status)
                .json({
                    ...message,
                    time: new Date().toISOString()
                })
    }
}