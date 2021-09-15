import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { delay } from 'rxjs';
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

  async createDeployment(name: String, image: String, port: string): Promise<any> {
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
      fs.writeFileSync(`/home/ec2-user/${name}/deployment.yaml`, data, 'utf8');
      console.log(name + ' deployment.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f /home/ec2-user/${name}/deployment.yaml`);
    }
    catch(err) {
      console.log(name + ' deployment.yaml 파일 생성 중 에러\n' + err); 
    }
  }

  async createService(name: String, port: string): Promise<String> {
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
  selector:
    app: ${name}
  type: LoadBalancer`;
    try {
      fs.writeFileSync(`/home/ec2-user/${name}/service.yaml`, data, 'utf8');
      console.log(name + ' service.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f /home/ec2-user/${name}/service.yaml`);
      delay(500);
      shell.exec(`kubectl get service > service.txt`);

      return new Promise((resolve, reject) => {
        fs.readFile(`service.txt`, (err, data)=>{
          if (err) 
            reject(err);
          else {
            const content = data.toString().replace(/ +/g, " "); //여러 공백을 공백 하나로 치환
            let start = content.indexOf(`${name}-service`);
            start = content.indexOf(' ', start + 1);
            start = content.indexOf(' ', start + 1);
            start = content.indexOf(' ', start + 1);
            const end = content.indexOf(' ', start + 1);
            resolve(content.substring(start + 1, end)); //해당 서비스의 external ip를 리턴
          }
        })
      });
    }
    catch(err) {
      console.log(name + ' service.yaml 파일 생성 중 에러\n' + err);
      return err;
    }
  }

  async deleteAll(name: String): Promise<String> {
    shell.exec(`kubectl delete all --selector app=${name}`);
    return `kubectl delete all --selector app=${name}`;
  }

  // async portForwarding(name: String, targetPort: Number, port: Number): Promise<any> {
  //   shell.exec(`kubectl port-forward service/${name}-service ${targetPort}:${port}`);
  // }
}

