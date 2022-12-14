import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username : string = 'adm';
  password : string = 'richard123';
  hide : boolean = true;
  isLogin : boolean = false;

  constructor(private router : Router, private HttpClient : HttpClient) { }

  ngOnInit(): void { 
    setTimeout(() => {
      this.login();
    })
  }

  public login(){
    this.HttpClient.post('http://localhost:3015/logon', {username : this.username, password : this.password}).toPromise().then((response : any)=> {
      console.log(response);
      if(response.token){
        this.isLogin = true;
        window.localStorage.setItem('token', response.token);
        
        this.router.navigateByUrl('');
        console.log("Logado");
      }
    })
  }

  
}
