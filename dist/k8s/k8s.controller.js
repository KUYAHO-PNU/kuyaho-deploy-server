"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K8sController = void 0;
const common_1 = require("@nestjs/common");
const k8s_service_1 = require("./k8s.service");
let K8sController = class K8sController {
    constructor(containerService) {
        this.containerService = containerService;
    }
    async createDeployment() {
        console.log("kyyaho!!");
        const name = "demo";
        const image = "cloudnatived/demo:hello";
        const port = 8888;
        return await this.containerService.createDeployment(name, image, port);
    }
    async createService() {
        const name = "demo";
        const port = 8888;
        return await this.containerService.createService(name, port);
    }
    async deleteAll() {
        const name = "demo";
        return await this.containerService.deleteAll(name);
    }
};
__decorate([
    (0, common_1.Get)("createDeployment"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "createDeployment", null);
__decorate([
    (0, common_1.Get)("createService"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "createService", null);
__decorate([
    (0, common_1.Get)("deleteAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], K8sController.prototype, "deleteAll", null);
K8sController = __decorate([
    (0, common_1.Controller)("k8s"),
    __metadata("design:paramtypes", [k8s_service_1.K8sService])
], K8sController);
exports.K8sController = K8sController;
//# sourceMappingURL=k8s.controller.js.map