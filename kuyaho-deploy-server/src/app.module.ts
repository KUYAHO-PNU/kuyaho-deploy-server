import { Injectable, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { FileEntity } from './entities/file.entity';
import { SpecEntity } from './entities/specification.entity';

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal:true,
      load:[databaseConfig],
      envFilePath: '.env'
    }),
  // TypeOrmModule.forRootAsync({
  //   imports:[ConfigModule],
  //   useFactory: async (config:ConfigService)=>({
      // type: config.get('database.type'),
      // host: config.get('database.host'),
      // port: config.get('database.port'),
      // username: config.get('database.username'),
      // password: config.get('database.password'), 
      // database: config.get('database.database'),
      // loging: config.get('database.logging'),
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
  //   }),
  //   inject:[ConfigService],
  // }),
  // TypeOrmModule.forFeature([SpecEntity,FileEntity])
  ],
    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
