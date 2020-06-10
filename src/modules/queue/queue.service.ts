import {Injectable} from '@nestjs/common';
import {QueueJob, JobStartCallback} from './queue.types';
import PgBoss, {JobOptions} from 'pg-boss';
import {dbConfig} from '../../db';

@Injectable()
export class QueueService {
  private boss!: PgBoss;
  private bossStart?: Promise<PgBoss>;

  constructor() {
    this.boss = new PgBoss({
      schema: 'public',
      host: dbConfig.host,
      user: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      port: dbConfig.port,
      ssl: dbConfig.ssl,
    } as PgBoss.ConstructorOptions);

    this.bossStart = this.boss.start();
  }

  public publish = (jobName: QueueJob, data: any, startAfter: Date) => {
    this.boss.publish(jobName, data, {startAfter});
  };

  public subscribe = async (jobName: QueueJob, jobStartCallback: JobStartCallback) => {
    if (this.bossStart) {
      await this.bossStart;
    }

    this.boss.subscribe(jobName, this.createJobStartCallback(jobStartCallback));
  };

  public createJobStartCallback(jobStartCallback: JobStartCallback) {
    return async ({data}: PgBoss.JobWithDoneCallback<JobOptions, void>) => await jobStartCallback(data);
  }

  public publishNotifyUserJob = async (chatId: number, content: string | undefined, startAfter: Date) => {
    return await this.publish(QueueJob.nofifyUserTask, {content, chatId}, startAfter);
  };
}
