import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studentData';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData = {} as Student;
  constructor(private apiService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  onLogin(loginData: Student) {
    this.apiService.logInUser(loginData.user_email, loginData.user_pass).subscribe(data => {
      data.forEach(function (value) {
        loginData.user_name = value.user_name;
        loginData.user_email = value.user_email;
      });
      if (!(loginData.user_name == "Invalid Email Or Password")) {
        sessionStorage.setItem('token', loginData.user_name);
        sessionStorage.setItem('user_id', loginData.user_email);
        this.router.navigate(["/homepage"]);
      } else {
        alert(loginData.user_name);
      }
    },
      error => {
        alert(error.error.text);
      });
  }

}
