 import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
 import { ProjectsService } from '../services/projects.service'
 import { ProjectDto, ProjectUpdateDTO } from '../dto/projects.dto'

 @Controller('projects')
 export class ProjectsController {
     constructor (
         private readonly projectService: ProjectsService
     ) {}
    
     // -------------------------------------------------------------------------------------------
     @Post('register')
     public async registerProject(@Body() body: ProjectDto) {
         
         return await this.projectService.createProject(body)
         
     }

     // -------------------------------------------------------------------------------------------

     @Get('all')
     
     public async sindUserById(@Param('id') id: string) {

         return await this.projectService.findProjects()
     }

     // -------------------------------------------------------------------------------------------

     @Get(':id')

     public async findUserById(@Param('id') id: string) {
         
         return await this.projectService.findProjectById(id)
         
     }

     // -------------------------------------------------------------------------------------------
     @Put('edit/:id')
     
     public async updateUser(@Param('id') id: string, @Body() body: ProjectUpdateDTO) {

         return await this.projectService.updateProject(body, id)

     }

     // -------------------------------------------------------------------------------------------

     @Delete('delete/:id')
     
     public async deleteteUser(@Param('id') id: string) {
        
         return await this.projectService.deleteProject(id)
     }

     // -------------------------------------------------------------------------------------------
     
 }
