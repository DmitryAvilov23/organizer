import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import * as moment from "moment";

import { DateService } from "./../../services/date.service";
import { TasksService } from "./../../services/tasks.service";

import { ITask } from "./../../models/interfaces";
import { switchMap } from "rxjs/operators";
@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;

  tasks: ITask[] = [];

  public get actualDate$(): Observable<moment.Moment> {
    return this._dateService.actualDate$;
  }

  constructor(private _dateService: DateService, private _tasksService: TasksService) {}

  ngOnInit(): void {
    this.createActualDateSubscription();

    this.form = new FormGroup({
      taskName: new FormControl("", Validators.required),
    });
  }

  createNewTask() {
    const taskName = this.form.get("taskName").value;
    const date = this._dateService.actualDate$.value.format("YYYY-MM-DD");

    const task: ITask = {
      taskName,
      date,
    };

    this._tasksService.createNewTask(task).subscribe(
      task => {
        this.tasks.push(task);
        this.resetTasksForm();
      },
      error => {
        console.error(error);
      }
    );
  }

  removeTask(task: ITask) {
    this._tasksService.removeTask(task).subscribe(
      () => {
        const indexToDelete = this.tasks.findIndex(t => t.id === task.id);

        this.tasks.splice(indexToDelete, 1);
      },
      error => {
        console.log(error);
      }
    );
  }

  private createActualDateSubscription() {
    this._dateService.actualDate$
      .pipe(switchMap(date => this._tasksService.getAllOrganizerTasks(date)))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  private resetTasksForm() {
    this.form.reset();
  }
}
