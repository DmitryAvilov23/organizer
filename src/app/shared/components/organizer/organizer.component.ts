import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import * as moment from "moment";

import { DateService } from "./../../services/date.service";
import { TasksService } from "./../../services/tasks.service";

import { ITask } from "./../../models/interfaces";
@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.scss"],
})
export class OrganizerComponent implements OnInit {
  form: FormGroup;

  public get actualDate$(): Observable<moment.Moment> {
    return this._dateService.actualDate$;
  }

  constructor(private _dateService: DateService, private _tasksService: TasksService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      taskName: new FormControl("", Validators.required),
    });
  }

  public createNewTask() {
    const taskName = this.form.get("taskName").value;
    const date = this._dateService.actualDate$.value.format("YYYY-MM-DD");

    const task: ITask = {
      taskName,
      date,
    };

    this._tasksService.createNewTask(task).subscribe(
      task => {
        console.log(task);
      },
      error => {
        console.error(error);
      }
    );
  }
}
