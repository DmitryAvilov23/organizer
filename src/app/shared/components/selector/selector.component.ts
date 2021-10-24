import { Component, OnInit } from "@angular/core";

import { DateService } from "./../../services/date.service";

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"],
})
export class SelectorComponent implements OnInit {
  public get date$() {
    return this._dateService.actualDate$;
  }

  constructor(private _dateService: DateService) {}

  ngOnInit(): void {}

  public changeActualMonth(count: number) {
    this._dateService.changeActualMonth(count);
  }
}
