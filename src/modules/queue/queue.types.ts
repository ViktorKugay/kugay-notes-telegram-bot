export enum QueueJob {
  templateJobName = 'templateJobName',
}

export interface JobOptions {
  url: string;
}

export type JobStartCallback = (data: any) => Promise<void>;
