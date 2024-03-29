 import { Injectable } from '@nestjs/common'
 import { InjectRepository } from '@nestjs/typeorm'
 import * as bcrypt from 'bcrypt'
 import { UsersEntity } from '../entities/users.entity'
 import { DeleteResult, Repository, UpdateResult } from 'typeorm'
 import { UserDTO, UserUpdateDTO} from '../dto/user.dto'
 import { ErrorManager } from '../../utils/error.manager'
 import { UsersProjectsEntity } from '../entities/usersProjects.entity'

 @Injectable()
 export class UsersService {
     constructor(
         @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
         @InjectRepository(UsersProjectsEntity) private readonly userProjectsRepository: Repository<UsersProjectsEntity>
     ){
         
     }

     // -------------------------------------------------------------------------------------------

     public async createUser(body: UserDTO): Promise<UsersEntity> {

         try {
             body.password = await bcrypt.hash(
                 body.password, 
                 + process.env.HASH_SALT  // use + to convert to numeric value
             )
             return await this.userRepository.save(body)
         } catch (error) {
             throw new Error(error)
         }
     }

     // -------------------------------------------------------------------------------------------

     public async findUsers(): Promise<UsersEntity[]> {

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
                 .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
                 .leftJoinAndSelect('projectsIncludes.project', 'project')
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

     public async relationToProject(body: any) {

         try {
             return await this.userProjectsRepository.save(body)
         } catch (error) {
            throw ErrorManager.createSignarureError(error.message)
         }

     }

     // --------------------------------------------------------------------------------------------

     public async findBy({key, value}:{key: keyof UserDTO; value: any}){
         try {
             const user: UsersEntity = await this.userRepository
                 .createQueryBuilder('user')
                 .addSelect('user.password')
                 .where({[key]: value})
                 .getOne()
             return user
            
         } catch (error) {
            
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
 