import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent implements OnInit {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null ;
  imagePreview: string | ArrayBuffer | null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfType = ["Petrol", "Diesel", "Electric", "Hybrid"];
  listOfTransmission = ["Manual", "Automatic"];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "OPEL", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "FIAT"];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      year: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  postCar() {
   console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand', this.postCarForm.get('brand')!.value);
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('year', this.postCarForm.get('year')!.value);
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('price', this.postCarForm.get('price').value);
    formData.append('description', this.postCarForm.get('description')!.value);
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
        this.isSpinning = false;
        this.message.success("Car posted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/admin/dashboard");
        console.log(res);
      }, error => {
        this.isSpinning = false;
        this.message.error("Error while posting car!!", { nzDuration: 5000 })
      })
  }

  onFileSelected(event: any) {
    this.selectedFile = event?.target.files[0];
    this.previewImage();
  }

 
previewImage() {
  if (this.selectedFile instanceof File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      console.log('Image Preview:', this.imagePreview);
    };
    reader.readAsDataURL(this.selectedFile);
  } else {
    this.imagePreview = null;
  }
}
}
