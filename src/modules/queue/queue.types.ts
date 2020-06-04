export enum QueueJob {
  nofifyUserTask = 'nofifyUserTask',
}

export interface JobOptions {
  url: string;
}

export type JobStartCallback = (data: any) => Promise<void>;
