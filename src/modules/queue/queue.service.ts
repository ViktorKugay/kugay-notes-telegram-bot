import {Injectable, OnModuleInit} from '@nestjs/common';
import {QueueJob, JobStartCallback} from './queue.types';
import PgBoss, {JobOptions} from 'pg-boss';
import {env} from '../../config';

@Injectable()
export class QueueService implements OnModuleInit {
  private boss!: PgBoss;

  async onModuleInit() {
    this.boss = new PgBoss(({
      host: env.POSTGRES_HOST,
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB,
      port: env.POSTGRES_PORT,
      schema: 'public',
      // ssl: {rejectUnauthorized: false},
    } as unknown) as PgBoss.ConstructorOptions);

    await this.boss.start();
  }

  public async publish(jobName: QueueJob, data: any) {
    await this.boss.publish(jobName, data, {startAfter: 5});
  }

  public async subscribe(jobName: QueueJob, jobStartCallback: JobStartCallback) {
    await this.boss.subscribe(jobName, this.createJobStartCallback(jobStartCallback));
  }

  public createJobStartCallback(jobStartCallback: JobStartCallback) {
    return async ({data}: PgBoss.JobWithDoneCallback<JobOptions, void>) => await jobStartCallback(data);
  }
}
