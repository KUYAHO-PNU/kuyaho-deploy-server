import { K8sService } from "./k8s.service";
export declare class K8sController {
    private readonly containerService;
    constructor(containerService: K8sService);
    createDeployment(): Promise<any>;
    createService(): Promise<String>;
    deleteAll(): Promise<String>;
}
