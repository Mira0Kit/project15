export interface MyWorker {
  id?: number;
  name: string;
  surname: string; 
  number: string;
  type: number;
}

export enum MyWorkerType {
  programmer,
  designer,
  copywriter,
  manager,
}

