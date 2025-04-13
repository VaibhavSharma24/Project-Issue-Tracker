import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issues.module';
import { Project } from './entities/project.entity';
import { Issue } from './entities/issue.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Project, Issue],
      synchronize: true, // Disable in production
    }),
    ProjectsModule,
    IssuesModule,
  ],
})
export class AppModule {}