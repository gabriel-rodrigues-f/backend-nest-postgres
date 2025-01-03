import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { ValidationPipe } from "@nestjs/common";
import { CustomBadRequestException } from "./common/exceptions/custom-bad-request-exception";

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  /* 
    app.use() -> aqui é possível inserir a classe de middleware
    caso eu a queira utilizar globalmente
  */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new CustomBadRequestException())
  await app.listen(3000);
}
bootstrap();
