import {Injectable, OnModuleInit} from '@nestjs/common';
import {env} from '../../config';
import PgBoss, {JobOptions} from 'pg-boss';
import {QueueJob, JobStartCallback} from './queue.types';

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
      ssl: {rejectUnauthorized: false},
    } as unknown) as PgBoss.ConstructorOptions);

    await this.boss.start();
    this.subscribe(QueueJob.templateJobName, async () => {
      console.log('!!!');
    });

    this.publish(QueueJob.templateJobName, {hello: 'world'});
  }

  public async publish(jobName: QueueJob, data: any) {
    await this.boss.publish(jobName, data);
  }

  public async subscribe(jobName: QueueJob, jobStartCallback: JobStartCallback) {
    await this.boss.subscribe(jobName, this.createJobStartCallback(jobStartCallback));
  }

  public createJobStartCallback(jobStartCallback: JobStartCallback) {
    return async ({data}: PgBoss.JobWithDoneCallback<JobOptions, void>) => await jobStartCallback(data);
  }
}
