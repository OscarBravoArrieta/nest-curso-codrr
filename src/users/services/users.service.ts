 import { Injectable } from '@nestjs/common'
 import { InjectRepository } from '@nestjs/typeorm'
 import { UsersEntity } from '../entities/users.entity'
 import { DeleteResult, Repository, UpdateResult } from 'typeorm'
 import { UserDTO, UserUpdateDTO} from '../dto/user.dto'
 import { ErrorManager } from 'src/utils/error.manager'

 @Injectable()
 export class UsersService {
     constructor(
         @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>
     ){}

     // -------------------------------------------------------------------------------------------

     public async createUser(body: UserDTO): Promise<UsersEntity> {

         try {
             return await this.userRepository.save(body)
         } catch (error) {
             throw new Error(error)
         }
         
     }

     // -------------------------------------------------------------------------------------------

     public async findUsers(): Promise<UsersEntity[]> {
        const users: UsersEntity[]  = await this.userRepository.find()
        console.log('USERS',users)

         try {
             const users: UsersEntity[]  = await this.userRepository.find()
             console.log('USERS',users)
             if(users.length === 0 ) {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se encontró el resultado'
                 })
             }
             
             return users
         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
         }
        
     }

     // -------------------------------------------------------------------------------------------

     public async findUserById(id: string): Promise<UsersEntity> {

         try {
             const user: UsersEntity = await this.userRepository
                 .createQueryBuilder('user')
                 .where({id})
                 .getOne()
                 if(!user) {
                    throw new ErrorManager({
                        type: 'BAD_REQUEST',
                        message: 'No se encontró el resultado'
                    })
                }
             return user
         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
         }  
     }

     // --------------------------------------------------------------------------------------------

     public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {

         try {
             const user: UpdateResult = await this.userRepository.update(id, body)
             if(user.affected === 0) {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se pudo actualizar'
                 })
             }
             return user

         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
         }  
     }

     // --------------------------------------------------------------------------------------------

     public async deleteUser(id: string): Promise<DeleteResult | undefined> {

         try {
             const user: DeleteResult = await this.userRepository.delete(id)
             if(user.affected === 0) {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se pudo borrar'
                 })
             }
             return user 

         } catch (error) {
            throw ErrorManager.createSignarureError(error.message)
         }  
     }

     // --------------------------------------------------------------------------------------------
 }
 