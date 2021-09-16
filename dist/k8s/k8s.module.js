"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.K8sModule = void 0;
const common_1 = require("@nestjs/common");
const k8s_controller_1 = require("./k8s.controller");
const k8s_service_1 = require("./k8s.service");
let K8sModule = class K8sModule {
};
K8sModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [k8s_controller_1.K8sController],
        providers: [k8s_service_1.K8sService],
        exports: [k8s_service_1.K8sService],
    })
], K8sModule);
exports.K8sModule = K8sModule;
//# sourceMappingURL=k8s.module.js.map