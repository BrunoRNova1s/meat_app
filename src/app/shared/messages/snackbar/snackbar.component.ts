import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { NotificationService } from "../notification.service";
import { Observable, timer } from "rxjs";
import { tap, switchMap } from "rxjs/operators";

@Component({
  selector: "mt-snackbar",
  templateUrl: "./snackbar.component.html",
  styleUrls: ["./snackbar.component.css"],
  animations: [
    trigger("snack-visibility", [
      state(
        "hidden",
        style({
          opacity: 0,
          bottom: 0
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          bottom: "30px"
        })
      ),
      transition("hidden => visible", animate("500ms 0s ease-in")),
      transition("visible => hidden", animate("500ms 0s ease-out"))
    ])
  ]
})
export class SnackbarComponent implements OnInit {
  message: string;

  snackVisibility: string = "hidden";

  constructor(private notificationService: NotificationService) {}

  /* 
  do -  permite fazer uma ação com a mensagem que chegou naquele momento
  subscribe - coloca um listner no observable 
                e só a partir desse ponto é que o observable vai notificar 
  */

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap(message => {
          this.message = message;
          this.snackVisibility = "visible";
        }),
        switchMap(message => timer(3000))
      )
      .subscribe(timer => (this.snackVisibility = "hidden"));
  }
}
