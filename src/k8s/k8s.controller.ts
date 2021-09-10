import { Controller, Get } from '@nestjs/common';
import { K8sService } from './k8s.service';

@Controller('k8s')
export class K8sController {
    constructor(private readonly containerService: K8sService) {}

    @Get('createDeployment')
    async createDeployment(): Promise<any> {
        const name = 'demo';
        const image = 'cloudnatived/demo:hello'
        const port = 8888;
        return await this.containerService.createDeployment(name, image, port);
    }

    @Get('deleteDeployment')
    async deleteDeployment(): Promise<any> {
        const name = 'demo';
        return await this.containerService.deleteDeployment(name);
    }

    @Get('createService')
    async createService(): Promise<any> {
        const name = 'demo';
        const port = 8888;
        return await this.containerService.createService(name, port);
    }

    @Get('portForwarding')
    async portForwarding(): Promise<any> {
        const name = 'demo';
        const targetPort = 9999;
        const port = 8888;
        return await this.containerService.portForwarding(name, targetPort, port);
    }
}
