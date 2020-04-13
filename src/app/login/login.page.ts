import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
email:string;
password: string;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }
  goToSignup() {
    this.router.navigate(["/register"]);
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';    
  }


}
