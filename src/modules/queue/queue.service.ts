import {Injectable} from '@nestjs/common';
import {QueueJob, JobStartCallback} from './queue.types';
import PgBoss, {JobOptions} from 'pg-boss';
import {dbConfig} from '../../db';

@Injectable()
export class QueueService {
  private boss: PgBoss;
  private bossStartJob: Promise<PgBoss> | undefined;

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

    this.bossStartJob = this.boss.start();
  }

  public publish = (jobName: QueueJob, data: any, startAfter: Date) => {
    this.boss.publish(jobName, data, {startAfter});
  };

  public subscribe = async (jobName: QueueJob, jobStartCallback: JobStartCallback) => {
    await this.awaitPgBossInitialization();
    await this.boss.subscribe(jobName, this.createJobStartCallback(jobStartCallback));
  };

  public createJobStartCallback(jobStartCallback: JobStartCallback) {
    return async ({data}: PgBoss.JobWithDoneCallback<JobOptions, void>) => await jobStartCallback(data);
  }

  public publishNotifyUserJob = async (chatId: number, content: string | undefined, startAfter: Date) => {
    return await this.publish(QueueJob.nofifyUserTask, {content, chatId}, startAfter);
  };

  private async awaitPgBossInitialization() {
    // ожидаем здесь pg-boss, потому что подписки инициализируются
    // в различных модулях приложения. Из-за этого некоторые модули
    // пытаются подписать ещё до того, как pg-boss успел
    // инициализироваться. Чтобы придотвратить подобную ошибку
    // приходится оиждать инициализацию
    if (this.bossStartJob) {
      await this.bossStartJob;
    }
  }
}
