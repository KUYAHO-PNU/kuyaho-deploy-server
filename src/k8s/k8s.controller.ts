import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { specificationDto } from 'src/dto/specification.dto';
import { K8sService } from './k8s.service';

@Controller('k8s')
export class K8sController {
    constructor(private readonly containerService: K8sService) {}

    @Post('createDeployment')
    // const image = 'cloudnatived/demo:hello'
    async createDeployment(@Body() data:any): Promise<any> {
        
        return await this.containerService.createDeployment(data.name, data.image, data.port);
    }

    @Post('createService')
    async createService(@Body() data: any): Promise<String> {

        return await this.containerService.createService(data.name, data.port);
    }

    @Post('deleteAll')
    async deleteAll(@Body() data:any): Promise<String> {
        
        return await this.containerService.deleteAll(data.name);
    }
    
    // @Get('portForwarding')
    // async portForwarding(): Promise<any> {
    //     const name = 'demo';
    //     const targetPort = 9999;
    //     const port = 8888;
    //     return await this.containerService.portForwarding(name, targetPort, port);
    // }
}
