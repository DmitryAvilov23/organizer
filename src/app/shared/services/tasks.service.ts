import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

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
}
