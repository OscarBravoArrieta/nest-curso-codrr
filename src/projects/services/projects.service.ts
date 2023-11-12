 import { Injectable } from '@nestjs/common'
 import { InjectRepository } from '@nestjs/typeorm'
 import { ProjectEntity } from '../entities/projects.entity'
 import { DeleteResult, Repository, UpdateResult } from 'typeorm'
 import { ErrorManager } from '../../utils/error.manager'
 import { ProjectDto, ProjectUpdateDTO } from '../dto/projects.dto'

 @Injectable()
 export class ProjectsService {
     constructor(
         @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>
     ) {}

     // -------------------------------------------------------------------------------------------

     public async createProject(body: ProjectDto) {

         try {
             return await this.projectRepository.save(body)
         } catch (error) {
             throw new Error(error)
         }
     }

     // --------------------------------------------------------------------------------------------

     public async findProjects(): Promise<ProjectEntity[]> {
         
         try {
             const projects: ProjectEntity[] = await this.projectRepository.find()
             if(projects.length === 0)  {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se encontraron resultados'
                 })
             }
             return projects
         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
            
         }
     }

     //--------------------------------------------------------------------------------------------

     public async findProjectById(id: string): Promise<ProjectEntity> {

         try {
             const project: ProjectEntity = await this.projectRepository
                 .createQueryBuilder('project')
                 .where({id})
                 .getOne()
                 if(!project) {
                     throw new ErrorManager({
                         type: 'BAD_REQUEST',
                         message: 'No se encontró el resultado'
                     })
                 }
                 return project
         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
         }
     }
     
     //--------------------------------------------------------------------------------------------
     public async updateProject(body: ProjectUpdateDTO, id: string): Promise<UpdateResult | undefined> {
     
         try {
             const project: UpdateResult = await this.projectRepository.update(id, body)
             if(project.affected === 0 ) {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se pudo actualizar'
                 })
             }
             return project
         } catch (error) {
             throw ErrorManager.createSignarureError(error.message)
         }
     }

     //--------------------------------------------------------------------------------------------

     public async deleteProject(id: string): Promise<DeleteResult | undefined> {

         try {
             const project: DeleteResult = await this.projectRepository.delete(id)
             if(project.affected === 0) {
                 throw new ErrorManager({
                     type: 'BAD_REQUEST',
                     message: 'No se pudo borrar'
                 })
             }
             return project
         } catch (error) {
            throw ErrorManager.createSignarureError(error.message)
         }  
     }

     //--------------------------------------------------------------------------------------------
 }
