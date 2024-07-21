import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../auth/components/service/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId: number = this.activatedRoute.snapshot.params["id"];
  car: any;
  processedImg: any;
  validateForm!:FormGroup;
  isSpinning = false;
  dateFormat:"DD-MM-YYYY";

  constructor(private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) { 

  }

  ngOnInit(){
    this.validateForm = this.fb.group({
      fromDate:[null,Validators.required],
      toDate:[null,Validators.required],
    })
    this.getCarById();

  }

  getCarById(){
    this.service.getCarById(this.carId).subscribe((res)=>{
      console.log(res);
      this.processedImg = 'data:image/jpeg;base64, ' + res.returnedImage;
      this.car = res;
    })
  }

  bookACar(data: any): void {
    console.log(data); // Kontrolloni të dhënat që po dërgoni
    this.isSpinning = true;
    let bookACarDto = {
      fromDate: data.fromDate,
      toDate: data.toDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    };
    this.service.bookACar(bookACarDto).subscribe(
      (res) => {
        console.log(res); // Kontrolloni përgjigjen nga serveri
        this.message.success("Booking request submitted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
      },
      (error) => {
        console.error("Booking error:", error); // Kontrolloni për gabime
        this.message.error("Something went wrong!!", { nzDuration: 5000 });
      }
    );
  }
  
  

}
