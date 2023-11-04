 import { Module } from '@nestjs/common'
 import { AppController } from './app.controller'
 import { AppService } from './app.service'
 import { UsersModule } from './users/users.module'
 import { ConfigModule } from '@nestjs/config'
 import { DataSourceConfig } from './config/data.source'
 import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsModule } from './projects/projects.module';

 @Module({ 
     imports: [
         ConfigModule.forRoot({
             envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
             isGlobal: true
         }),
         TypeOrmModule.forRoot({...DataSourceConfig}),
         UsersModule,
         ProjectsModule,
         
     ],
     controllers: [AppController],
     providers: [AppService],
     
})
export class AppModule {}
