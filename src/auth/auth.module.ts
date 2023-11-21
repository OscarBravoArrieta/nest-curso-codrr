 import { Module, Global } from '@nestjs/common'
 import { AuthService } from './services/auth/auth.service'
 import { AuthController } from './controllers/auth.controller'
 import { UsersService } from '../users/services/users.service'
import { UsersModule } from 'src/users/users.module'
 
 @Global()
 @Module({
     imports: [UsersModule],
     providers: [AuthService, UsersService],
     controllers: [AuthController]
 })
 export class AuthModule {}
