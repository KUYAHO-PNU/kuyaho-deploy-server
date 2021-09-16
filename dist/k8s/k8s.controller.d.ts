import { K8sService } from './k8s.service';
export declare class K8sController {
    private readonly containerService;
    constructor(containerService: K8sService);
    createDeployment(data: any): Promise<any>;
    createService(data: any): Promise<String>;
    deleteAll(data: any): Promise<String>;
}
