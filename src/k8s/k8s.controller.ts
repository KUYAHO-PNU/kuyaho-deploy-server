import { Controller, Get, Param } from '@nestjs/common';
import { specificationDto } from 'src/dto/specification.dto';
import { K8sService } from './k8s.service';

@Controller('k8s')
export class K8sController {
    constructor(private readonly containerService: K8sService) {}

    @Get('createDeployment')
    // const image = 'cloudnatived/demo:hello'
    async createDeployment(@Param('name') name:string ,@Param('image') image:string, @Param('port') port:string): Promise<any> {
        
        return await this.containerService.createDeployment(name, image, port);
    }

    @Get('createService')
    async createService(@Param('name') name:string ,@Param('port') port:string): Promise<String> {

        return await this.containerService.createService(name, port);
    }

    @Get('deleteAll')
    async deleteAll(@Param('name') name:string): Promise<String> {
        
        return await this.containerService.deleteAll(name);
    }
    
    // @Get('portForwarding')
    // async portForwarding(): Promise<any> {
    //     const name = 'demo';
    //     const targetPort = 9999;
    //     const port = 8888;
    //     return await this.containerService.portForwarding(name, targetPort, port);
    // }
}
