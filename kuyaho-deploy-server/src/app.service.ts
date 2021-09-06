import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { fileDto } from './dto/file.dto';
import { specificationDto } from './dto/specification.dto';
import { FileEntity } from './entities/file.entity';
import { SpecEntity } from './entities/specification.entity';

@Injectable()
export class AppService {

  // constructor(
  // @InjectRepository(SpecEntity) private specRepository: Repository<SpecEntity>)
  // // @InjectRepository(FileEntity) private fileRepository: Repository<FileEntity>)
  // {
  //   this.specRepository=specRepository
  //   // this.fileRepository=fileRepository
  // }
  getHello(): string {
    return 'Hello World!';
  }
  // 인자값 data:specificationDto
  createdocker(data:specificationDto, ){
    if(data.plaform=='gcp'){
    //data.runtime
    var line ="FROM "+data.runtime +" AS builder\n"
    fs.writeFile("DockerFile",line,'utf-8',(err)=>{})
    //setting Path project directory
    line = "WORKDIR /app\n"+"COPY . .\n"+"RUN npm install\nRUN npm run build\n\n"+
    "FROM node:10-alpine\n"+"COPY --from=builder /app ./\n"+"CMD [\"npm\",\"run\",\"start:prod\"]\n"
    fs.appendFile("DockerFile",line,'utf-8',(err)=>{})
  }
  //AWS Function imagefile
  else if(data.plaform=='aws'){
    // data:specificationDto
    var line ="FROM public.ecr.aws/lambda/"+data.runtime+"\n"
    fs.writeFile("DockerFile",line,'utf-8',(err)=>{})
    // name= data.fuctionName
    line = "COPY src/main.ts package.json  /var/task/\n" +"RUN npm install\n"+"CMD [ \"app.handler\" ]"+
    "RUN docker build -t name.\n"+"RUN docker run -p 9000:8080 name "
    fs.appendFile("DockerFile",line,'utf-8',(err)=>{})
  
  }
    //dockerignore
    line = "node_modules\ndist"
    fs.writeFile(".dockerignore",line,'utf-8',(err)=>{})
    return 'Hello---- World!';
  }
  //------------------File CRUD----------------------------

  // async createFile(data:fileDto){
  //   return this.fileRepository.save(data)
  // }

  // async findOneFile(id: string, name:string){
  //   return this.fileRepository.findOne({userId:id}&&{functionName:name})
  // }
  
  // async updateFile(id: string, name:string, data:fileDto){
  //   return this.fileRepository.update(data,{userId:id}&&{functionName:name})
  // }

  // async deleteFile(id: string, name:string){
  //   return this.fileRepository.delete({userId:id}&&{functionName:name})
  // }

  //------------------Spec CRUD----------------------------

//   async createSpec(data:specificationDto){
//     return this.specRepository.save(data)
//   }

//   async findOneSpec(id: string, name:string){
//     return this.specRepository.findOne({userId:id}&&{functionName:name})
//   }

//   async updateSpec(id: string, name:string, data:specificationDto){
//     return this.specRepository.update(data,{userId:id}&&{functionName:name})
//   }

//   async deleteSpec(id: string, name:string){
//     return this.specRepository.delete({userId:id}&&{functionName:name})
//   }
}
