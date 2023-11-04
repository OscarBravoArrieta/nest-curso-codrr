 import { IProject } from "../../interfaces/project.interface"
 import { BaseEntity } from "../../config/base.entity"
 import { Column, Entity, OneToMany } from "typeorm"
 import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity"
 
 @Entity({ name: 'projects'})
 export class ProjectEntity extends BaseEntity implements IProject {
     
     @Column()
     name: string

     @Column()
     description: string

     @OneToMany(() => UsersProjectsEntity, (userProjects) =>userProjects.project)
     usersIncludes: UsersProjectsEntity[]
 }