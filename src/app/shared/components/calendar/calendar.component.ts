import { Component, OnInit } from "@angular/core";

import { IWeek } from "../../models/interfaces";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  calendar: IWeek[] = [];

  constructor() {}

  ngOnInit(): void {}
}
