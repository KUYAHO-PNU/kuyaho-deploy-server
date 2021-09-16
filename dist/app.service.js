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
const shell = require("shelljs");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    createdocker(data) {
        var line = "FROM " + data.runtime + " AS builder\n";
        fs.writeFileSync("/home/ec2-user/clone/" + data.functionName + "/Dockerfile", line, 'utf-8');
        line = "WORKDIR /app\n" + "COPY . .\n" + "RUN npm install\nRUN npm run build\n\n" +
            "FROM " + data.runtime + "\n" + "COPY --from=builder /app ./\n" + "CMD [\"npm\",\"run\",\"start:prod\"]\n";
        fs.appendFileSync("/home/ec2-user/clone/" + data.functionName + "/Dockerfile", line, 'utf-8');
        line = "node_modules\ndist";
        fs.writeFileSync("/home/ec2-user/clone/" + data.functionName + "/.dockerignore", line, 'utf-8');
        shell.exec(`docker build -t dhd6573/${data.functionName}:demo /home/ec2-user/clone/${data.functionName}/.`);
        shell.exec(`docker push dhd6573/${data.functionName}:demo`);
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map