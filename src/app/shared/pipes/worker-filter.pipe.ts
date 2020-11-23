import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';
import { MyWorker } from '../models/worker.model';

@Pipe({
  name: 'workerFilter'
})
export class WorkerFilterPipe implements PipeTransform {

  transform(workers: MyWorker[], searchStr: string): MyWorker[] {
    if (searchStr === '' || workers.length === 0) {
      return workers;
    }
    else {
      let filteredWorkers = workers.filter(
        (worker => {
          let filt = [worker.name, worker.surname, (worker.name + " " + worker.surname), (worker.surname + " " + worker.name)];
          return filt.some((item) => item.toLowerCase().startsWith(searchStr.toLowerCase()));
        }));
      return filteredWorkers;
    }
  }
}
