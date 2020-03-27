import { Component, OnInit } from '@angular/core';
import { Student } from '../model/studentData';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public newRegistration = {} as Student;
  constructor(private apiService: AuthService,public router: Router) { }

  ngOnInit() {
  }
  onSubmit(newRegistration: Student){
    this.apiService.createUser(newRegistration).subscribe(data => {
      alert('You Successfully registered.');
      this.router.navigate(['/login']);
    },
      error => {
        alert(error.error.text);
      });
  } 
}
