import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AliasesService} from './aliases.service';
import {Alias} from './aliases.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Alias])],
  providers: [AliasesService],
  exports: [AliasesService],
})
export class AliasesModule {}
