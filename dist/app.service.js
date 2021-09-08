"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    createdocker(data) {
        if (data.plaform == 'gcp') {
            var line = "FROM " + data.runtime + " AS builder\n";
            fs.writeFile("DockerFile", line, 'utf-8', (err) => { });
            line = "WORKDIR /app\n" + "COPY . .\n" + "RUN npm install\nRUN npm run build\n\n" +
                "FROM node:10-alpine\n" + "COPY --from=builder /app ./\n" + "CMD [\"npm\",\"run\",\"start:prod\"]\n";
            fs.appendFile("DockerFile", line, 'utf-8', (err) => { });
        }
        else if (data.plaform == 'aws') {
            var line = "FROM public.ecr.aws/lambda/" + data.runtime + "\n";
            fs.writeFile("DockerFile", line, 'utf-8', (err) => { });
            line = "COPY src/main.ts package.json  /var/task/\n" + "RUN npm install\n" + "CMD [ \"app.handler\" ]" +
                "RUN docker build -t name.\n" + "RUN docker run -p 9000:8080 name ";
            fs.appendFile("DockerFile", line, 'utf-8', (err) => { });
        }
        line = "node_modules\ndist";
        fs.writeFile(".dockerignore", line, 'utf-8', (err) => { });
        return 'Hello---- World!';
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map