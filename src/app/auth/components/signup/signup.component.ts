import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkPrime } from 'crypto';
import { register } from 'module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(private fb: FormBuilder){ }

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
  }
}

