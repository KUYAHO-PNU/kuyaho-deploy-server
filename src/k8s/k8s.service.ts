import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { delay } from 'rxjs';
import shell = require('shelljs')

const ec2_path = `/home/ec2-user/clone`;

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
      fs.writeFileSync(`${ec2_path}/${name}/deployment.yaml`, data, 'utf8');
      console.log(name + ' deployment.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f ${ec2_path}/${name}/deployment.yaml`);
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
      fs.writeFileSync(`${ec2_path}/${name}/service.yaml`, data, 'utf8');
      console.log(name + ' service.yaml 파일 생성 완료');
      shell.exec(`kubectl apply -f ${ec2_path}/${name}/service.yaml`);
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

  async getPods(): Promise<Array<Object>> {
    shell.exec(`kubectl get pod > pod.txt`);

    return new Promise((resolve, reject) => {
      fs.readFile(`pod.txt`, (err, data)=>{
        if (err) 
          reject(err);
        else {
          let podArray = new Array();
          let content = data.toString().replace(/ +/g, " "); //여러 공백을 공백 하나로 치환
          content = content.toString().replace("\n", " ");
          let index = content.indexOf('AGE');
          index = content.indexOf(' ', index + 1);
          while(index != -1) {
            let start = index;
            let end = content.indexOf(' ', start + 1);
            let name = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let ready = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let status = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let restarts = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let age;
            if (end == -1){
              age = content.substring(start + 1);
            }
            else {
              age = content.substring(start + 1, end);
            }

            let pod = {"name": name, "ready": ready, "status": status, "restarts": restarts, "age": age};
            podArray.push(pod);
            index = end;
          }
          resolve(podArray);
          // let start = content.indexOf(`${name}-service`);
          // start = content.indexOf(' ', start + 1);
          // start = content.indexOf(' ', start + 1);
          // start = content.indexOf(' ', start + 1);
          // const end = content.indexOf(' ', start + 1);
          // resolve(content.substring(start + 1, end)); //해당 서비스의 external ip를 리턴
        }
      })
    });
  }

  async getServices(): Promise<Array<Object>> {
    shell.exec(`kubectl get service > service.txt`);

    return new Promise((resolve, reject) => {
      fs.readFile(`service.txt`, (err, data)=>{
        if (err) 
          reject(err);
        else {
          let serviceArray = new Array();
          let content = data.toString().replace(/ +/g, " "); //여러 공백을 공백 하나로 치환
          content = content.toString().replace("\n", " ");
          let index = content.indexOf('AGE');
          while(index != -1) {
            let start = content.indexOf(' ', index + 1);
            let end = content.indexOf(' ', start + 1);
            let name = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let type = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let clusterIP = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let externalIP = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let port = content.substring(start + 1, end);

            start = end;
            end = content.indexOf(' ', start + 1);
            let age = content.substring(start + 1, end);

            if (name!="kubernetes") {
              let service = {"name": name, "type": type, "clusterIP": clusterIP, "externalIP": externalIP, "port": port, "age": age};
              serviceArray.push(service);
            }
            index = content.indexOf(' ', end + 1);
          }
          resolve(serviceArray);
        }
      })
    });
  }
}

