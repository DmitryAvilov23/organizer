import { Injectable } from "@angular/core";

import { BehaviorSubject } from "rxjs";

import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class DateService {
  public actualDate$: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() {
    this.actualDate$.subscribe(val => {
      console.log(val);
    });
  }

  changeActualMonth(count: number) {
    const date = this.actualDate$.value.add(count, "month");

    this.actualDate$.next(date);
  }
}
