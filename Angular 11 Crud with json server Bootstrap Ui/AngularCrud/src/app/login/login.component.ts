import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup
  constructor(private formBuilder:FormBuilder, private http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({

      email:[''],
      password:['']
    })
  }

  login(){

    this.http.get<any>("http://localhost:3000/signUpUsers").subscribe


    ({next:(res)=>{


     console.log("res",res[0])
     const user= res.find((a:any)=>{

       return a.email===this.loginForm.value.email && a.email===this.loginForm.value.password
     });
     console.log("login", user);
     if(user){
        alert("Login Success");
          this.loginForm.reset();
          this.router.navigate(['dashboard'])
     }else{
      alert("user not found");
     }
    },error:err=>{alert("Something went wrong!!")}
  })
  }
}
