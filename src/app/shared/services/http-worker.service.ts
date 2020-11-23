import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyWorker } from '../models/worker.model';

@Injectable({
  providedIn: 'root'
})
export class HttpWorkerService {
  baseApi = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getWorkers(): Promise<any> 
  {
    return this.http.get(`${this.baseApi}workers`).toPromise();
  }

  addWorker(data: MyWorker) {
    return this.http.post(`${this.baseApi}workers`, data).toPromise();
  }

  deleteWorker(id: number) {
    return this.http.delete(`${this.baseApi}workers/` + id).toPromise();
  }

  editWorker(worker: MyWorker) {
    return this.http.put(`${this.baseApi}workers/` + worker.id, worker).toPromise();
  }
}
