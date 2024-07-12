import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPrime } from 'crypto';
import { register } from 'module';
import { AuthService } from '../service/auth/auth.service';
import {NzMessageService} from "ng-zorro-antd/message"
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router ){ }

ngOnInit() {
  this.signupForm = this.fb.group({
    name: [null,[Validators.required]],
    email: [null,[Validators.required,Validators.email]],
    password: [null,Validators.required],
    checkPassword: [null,Validators.required,this.confirmationValidate],
  })
  }
  confirmationValidate = (control: FormControl): {[s: string]: boolean}=>{
    if(!control.value){
      return { required: true};
    }else if (control.value !== this.signupForm.controls['password'].value){
    }
    return {};
  };

  register(){
    console.log(this.signupForm.value);
    this.authService.register(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if(res.id != null){
      this.message.success("Signup successful",{nzDuration: 5000});
      this.router.navigateByUrl("/login")
      }else{
      this.message.error("Something went wrong!!",{nzDuration:5000});
      }
  
    })
  }
}

