import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";

import { Subscription } from "rxjs";

import * as moment from "moment";

import { DateService } from "./../../services/date.service";

import { IWeek } from "../../models/interfaces";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendar: IWeek[] = [];
  actualDateSubscr: Subscription;

  constructor(private _dateService: DateService) {}

  ngOnInit(): void {
    this.actualDateSubscr = this._dateService.actualDate$.subscribe(this.setNewDate.bind(this));
  }

  ngOnDestroy() {
    this.actualDateSubscr.unsubscribe();
  }

  public selectDay(day: moment.Moment) {
    this._dateService.changeActualDate(day);
  }

  private setNewDate(now: moment.Moment) {
    const startDay = now.clone().startOf("month").startOf("week");
    const endDay = now.clone().endOf("month").endOf("week");

    const actualDate = startDay.clone().subtract(1, "day");

    const calendar = [];

    while (actualDate.isBefore(endDay, "day")) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = actualDate.add(1, "day").clone();
            const active = moment().isSame(value, "date");
            const disabled = !now.isSame(value, "month");
            const selected = now.isSame(value, "date");

            return {
              value,
              active,
              disabled,
              selected,
            };
          }),
      });
    }

    this.calendar = calendar;
  }
}
