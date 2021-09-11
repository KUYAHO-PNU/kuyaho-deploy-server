import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import shell = require('shelljs')

@Injectable()
export class K8sService {

    /*
    async createContainer(): Promise<any> {
        //shell.cd('~');
        //shell.exec('ls -la');
        //shell.echo('hello');
        const name = 'demo';
        const dockerID = "id";
        const imageName = 'myhello';
        const newPort = 9999;
        const originPort = 8888;
        shell.exec(`kubectl run ${name} --image=${dockerID}/${imageName} --port=${newPort} --labels app=${name}`);
        shell.exec(`kubectl port-forward ${name} ${newPort}:${originPort}`);
        //kubectl apply -f echo-pod.yml
    }
    */

    async createDeployment(name: String, image: String, port: Number): Promise<any> {
        const data = `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}-deployment
  labels:
    app: ${name}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${name}
  template:
    metadata:
      labels:
        app: ${name}
    spec:
      containers:
      - name: ${name}
        image: ${image}
        ports:
        - containerPort: ${port}`;
        try {
            fs.writeFileSync('deployment.yaml', data, 'utf8');
            console.log(name + ' deployment.yaml 파일 생성 완료');
            shell.exec(`kubectl apply -f deployment.yaml`);
        }
        catch(err) {
            console.log(name + ' deployment.yaml 파일 생성 중 에러\n' + err);
        }
    }

    async deleteAll(name: String): Promise<any> {
        shell.exec(`kubectl delete all --selector app=${name}`);
        return `kubectl delete all --selector app=${name}`;
    }

    async createService(name: String, port: Number): Promise<any> {
        const data = `
apiVersion: v1
kind: Service
metadata:
  name: ${name}-service
  labels:
    app: ${name}
spec:
  ports:
  - port: ${port}
    protocol: TCP
    targetPort: ${port}
  selector:
    app: ${name}
  type: ClusterIP`;
        try {
            fs.writeFileSync('service.yaml', data, 'utf8');
            console.log(name + ' service.yaml 파일 생성 완료');
            shell.exec(`kubectl apply -f service.yaml`);
        }
        catch(err) {
            console.log(name + ' service.yaml 파일 생성 중 에러\n' + err);
        }
    }

    async portForwarding(name: String, targetPort: Number, port: Number): Promise<any> {
        shell.exec(`kubectl port-forward service/${name}-service ${targetPort}:${port}`);
    }
}

