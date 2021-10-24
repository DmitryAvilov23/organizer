import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { CalendarComponent } from "./shared/components/calendar/calendar.component";
import { OrganizerComponent } from "./shared/components/organizer/organizer.component";
import { SelectorComponent } from "./shared/components/selector/selector.component";

import { MomentPipe } from "./shared/pipes/moment.pipe";
@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
