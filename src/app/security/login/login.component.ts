import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { LoginService } from "./login.service";
import { User } from "./user.model";
import { NotificationService } from "app/shared/messages/notification.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "mt-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  navigaTo: string;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required])
    });
    this.navigaTo = this.activatedRoute.snapshot.params["to"] || btoa("/");
  }

  //NOTA: para receber o objecto é necessário o subscriber
  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        //callbacks
        user => this.notificationService.notify(`Bem-vindo ${user.name}`),
        //HttpErrorResponse
        response => this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([atob(this.navigaTo)]);
        }
      );  
  }
}
