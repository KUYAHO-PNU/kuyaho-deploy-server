export declare class K8sService {
    createDeployment(name: String, image: String, port: Number): Promise<any>;
    createService(name: String, port: Number): Promise<String>;
    deleteAll(name: String): Promise<String>;
}
