import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppConfigService } from "./config/app/app-config.service";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  /* Create NestExpress Server APP */
<<<<<<< HEAD
  const app = await NestFactory.create(AppModule, { cors: true });
=======
  const app = await NestFactory.create(AppModule, {cors:true});
>>>>>>> fc4016a6b4ae30096d2bfc4d18504410f68de04c

  // /* Project ENV 환경 로드 */
  // const appConfig: AppConfigService = app.get("AppConfigService");

  /* ENV dev PORT 적용 */
  await app.listen(8080);
}
bootstrap();
