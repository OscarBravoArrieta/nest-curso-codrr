import { Module } from '@nestjs/common'
import { ProjectsService } from './projects/projects.service'


@Module({
  providers: [ProjectsService]
})
export class ProjectsModule {}
