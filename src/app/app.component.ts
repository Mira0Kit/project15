import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MyWorker,
  MyWorkerType,
} from './shared/models/worker.model';
import { HttpWorkerService } from './shared/services/http-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'Список сотрудников';
  workers: MyWorker[] = [];
  myWorkerType = MyWorkerType;
  searchStr = "";

  constructor(
    private httpWorkerService: HttpWorkerService 
    ) { }

  ngOnInit(): void {
    this.getWorkers();
  }

  async getWorkers() {
    try {
      this.workers = await this.httpWorkerService.getWorkers();
    }
    catch (err) {
      console.log(err);
    }
  }

  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  async onDeleteById(id: number) {
    try {
      await this.httpWorkerService.deleteWorker(id);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.getWorkers();
    }
  }

  async onEditWorker(worker) {
    try {
      await this.httpWorkerService.editWorker(worker);

    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.getWorkers();
    }
  }

  async onAddWorker(worker) {
    try {
      let id =
        this.workers.length > 0
          ? this.workers[this.workers.length - 1].id + 1
          : 0;
      worker.id = id;
      await this.httpWorkerService.addWorker(worker);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      this.getWorkers();
    }
  }
}
