import { specification } from 'src/interfaces/interface-specification';
export declare class SpecEntity implements specification {
    userId: string;
    functionName: string;
    environments: string;
    region: string;
    imageConfig: string;
    memorySize: number;
    runtime: string;
    timeout: number;
    vpcConfig: string;
    port: number;
    sourceCodeURL: string;
}
