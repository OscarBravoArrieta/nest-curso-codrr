 import { Injectable } from '@nestjs/common'
 import * as bcrypt from 'bcrypt'
 import * as jwt from 'jsonwebtoken'
 import { UsersEntity } from '../../../users/entities/users.entity'
 import { UsersService } from '../../../users/services/users.service'
 import { PayloadToken } from 'src/auth/interfaces/auth.interface'


 @Injectable()
 export class AuthService {
     constructor (
         private readonly userService: UsersService
     ) {}
     //------------------------------------------------------------------------------------------------
     public async validateUser(username: string, password: string) {

         const userByUserName = await this.userService.findBy({
             key: 'username',
             value: username
         })

         const userByEmail = await this.userService.findBy({
             key: 'email',
             value: username
         })

         if(userByUserName) {
             const match = await bcrypt.compare(password, userByUserName.password)
             if (match) return userByUserName
         }

         if(userByEmail) {
             const match = await bcrypt.compare(password, userByEmail.password)
             if (match) return userByEmail
         }

         return null

     }

     //------------------------------------------------------------------------------------------------

     public signJWT(
         {
             payload, 
             secret, 
             expires
         }: {
             payload: jwt.JwtPayload; 
             secret: any; 
             expires: number | string; 
         }) {
             
             return jwt.sign(payload, secret, { expiresIn: expires })
         
     }

     //------------------------------------------------------------------------------------------------
     
     public async generateJWT(user: UsersEntity): Promise<any> {

         const getUSer = await this.userService.findUserById(user.id)

         const payload: PayloadToken = {
             role: getUSer.role,
             sub: getUSer.id
         }

         return {
             accessToken: this.signJWT({
                 
                  payload,
                  secret: process.env.JWT_SECRET,
                  expires: '1h'

             }),
             user
         }
         
     }



     //------------------------------------------------------------------------------------------------
 }
 
