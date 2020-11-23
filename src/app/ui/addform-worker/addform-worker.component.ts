import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyWorkerType, MyWorker } from 'src/app/shared/models/worker.model';

@Component({
  selector: 'app-addform-worker',
  templateUrl: './addform-worker.component.html',
  styleUrls: ['./addform-worker.component.css'],
})
export class AddformWorkerComponent {

  @Output() addWorker = new EventEmitter<MyWorker>();
  myWorkerType = MyWorkerType;
  workerForm: FormGroup;
  workers: MyWorker[] = [];
  public mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

  constructor() {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.pattern(/^([А-Я]{1}[а-я]{1,20}|[A-Z]{1}[a-z]{1,20})$/), Validators.required]),
      surname: new FormControl(null, [Validators.pattern(/^([А-Я]{1}[а-я]{1,20}|[A-Z]{1}[a-z]{1,20})$/), Validators.required]),
      number: new FormControl(null, [Validators.pattern(/^[+,0-9,(,),-]+$/), Validators.required]),
      type: new FormControl(0, [Validators.required])
    })
  }

  onAddWorker() {
    this.addWorker.emit({
      name: this.workerForm.value.name,
      surname: this.workerForm.value.surname,
      number: this.workerForm.value.number,
      type: this.workerForm.value.type
    });

    this.workerForm.reset({
      'type': 0
    });
  }
}
