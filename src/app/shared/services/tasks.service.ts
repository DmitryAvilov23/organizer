import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";

import { environment } from "./../../../environments/environment";

import { ICreateTaskResponse, ITask } from "./../models/interfaces";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private _httpClient: HttpClient) {}

  createNewTask(task: ITask): Observable<ITask> {
    return this._httpClient
      .post<ICreateTaskResponse>(`${environment.tasksUrl}/tasks/${task.date}.json`, task)
      .pipe(
        map(response => {
          return { ...task, id: response.name };
        })
      );
  }

  getAllOrganizerTasks(date: moment.Moment): Observable<ITask[]> {
    return this._httpClient
      .get<ITask[]>(`${environment.tasksUrl}/tasks/${date.format("YYYY-MM-DD")}.json`)
      .pipe(
        map(tasks => {
          if (!tasks) {
            return [];
          }

          return Object.keys(tasks).map(key => ({ ...tasks[key as any], id: key }));
        })
      );
  }

  removeTask(task: ITask): Observable<void> {
    return this._httpClient.delete<void>(
      `${environment.tasksUrl}/tasks/${task.date}/${task.id}.json`
    );
  }
}
