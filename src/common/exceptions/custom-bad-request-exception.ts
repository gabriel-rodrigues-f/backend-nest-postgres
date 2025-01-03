import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";

@Catch(BadRequestException)
export class CustomBadRequestException<T extends BadRequestException> implements ExceptionFilter {
  catch (exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse()
    return response.status(400).json({ message: 'Ops' })
  }
}