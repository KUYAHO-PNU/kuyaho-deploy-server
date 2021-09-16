"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K8sService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const rxjs_1 = require("rxjs");
const shell = require("shelljs");
let K8sService = class K8sService {
    async createDeployment(name, image, port) {
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
            fs.writeFileSync(`/home/ec2-user/clone/${name}/deployment.yaml`, data, 'utf8');
            console.log(name + ' deployment.yaml 파일 생성 완료');
            shell.exec(`kubectl apply -f /home/ec2-user/clone/${name}/deployment.yaml`);
        }
        catch (err) {
            console.log(name + ' deployment.yaml 파일 생성 중 에러\n' + err);
        }
    }
    async createService(name, port) {
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
            fs.writeFileSync(`/home/ec2-user/clone/${name}/service.yaml`, data, 'utf8');
            console.log(name + ' service.yaml 파일 생성 완료');
            shell.exec(`kubectl apply -f /home/ec2-user/clone/${name}/service.yaml`);
            (0, rxjs_1.delay)(500);
            shell.exec(`kubectl get service > service.txt`);
            return new Promise((resolve, reject) => {
                fs.readFile(`service.txt`, (err, data) => {
                    if (err)
                        reject(err);
                    else {
                        const content = data.toString().replace(/ +/g, " ");
                        let start = content.indexOf(`${name}-service`);
                        start = content.indexOf(' ', start + 1);
                        start = content.indexOf(' ', start + 1);
                        start = content.indexOf(' ', start + 1);
                        const end = content.indexOf(' ', start + 1);
                        resolve(content.substring(start + 1, end));
                    }
                });
            });
        }
        catch (err) {
            console.log(name + ' service.yaml 파일 생성 중 에러\n' + err);
            return err;
        }
    }
    async deleteAll(name) {
        shell.exec(`kubectl delete all --selector app=${name}`);
        return `kubectl delete all --selector app=${name}`;
    }
};
K8sService = __decorate([
    (0, common_1.Injectable)()
], K8sService);
exports.K8sService = K8sService;
//# sourceMappingURL=k8s.service.js.map