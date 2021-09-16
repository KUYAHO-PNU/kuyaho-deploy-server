import { AppService } from './app.service';
import { specificationDto } from './dto/specification.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    createdocker(data: specificationDto): void;
}
