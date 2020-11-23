import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyWorker, MyWorkerType } from 'src/app/shared/models/worker.model';

@Component({
  selector: 'app-table-workers',
  templateUrl: './table-workers.component.html',
  styleUrls: ['./table-workers.component.css'],
})
export class TableWorkersComponent  {
  @Input() title: string;
  @Input() workers: MyWorker[] = [];
  @Input() myWorkerType = MyWorkerType;
  workerForm: FormGroup;

  public mask = ['+', '7', '(',/[1-9]/, /\d/, /\d/,')', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/];

  @Output() deleteWorker = new EventEmitter<number>();
  @Output() editWorker = new EventEmitter<MyWorker>();

  constructor() {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.pattern(/^([А-Я]{1}[а-я]{1,20}|[A-Z]{1}[a-z]{1,20})$/), Validators.required]),
      surname: new FormControl(null, [Validators.pattern(/^([А-Я]{1}[а-я]{1,20}|[A-Z]{1}[a-z]{1,20})$/), Validators.required]),
      number: new FormControl(null, [Validators.pattern(/^[+,0-9,(,),-]+$/), Validators.required]),
      type: new FormControl(0, [Validators.required])
    });
  }

  fillForm(worker: MyWorker): void {
    this.workerForm.setValue({
      name: worker.name,
      surname: worker.surname,
      number: worker.number,
      type: worker.type,
    }
    );
  }

  onDeleteWorker(id: number) {
    this.deleteWorker.emit(id);
  }

  onChangeWorker(worker) {
    this.editWorker.emit({
      name: this.workerForm.value.name,
      surname: this.workerForm.value.surname,
      number: this.workerForm.value.number,
      type: this.workerForm.value.type,
      id: worker.id,
    });
  }
}
