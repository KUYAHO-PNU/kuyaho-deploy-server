export declare class K8sService {
    createDeployment(name: String, image: String, port: string): Promise<any>;
    createService(name: String, port: string): Promise<String>;
    deleteAll(name: String): Promise<String>;
}
