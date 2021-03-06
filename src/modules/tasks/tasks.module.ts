import {Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Task} from './tasks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
