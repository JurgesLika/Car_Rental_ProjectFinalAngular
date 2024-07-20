import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  isSpinning = false;
  carId: number = this.activedRouter.snapshot.params["id"];
  imgChanged: boolean = false;
  selectedFile:any;
  imagePreview:string|ArrayBuffer|null;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfType = ["Petrol", "Diesel", "Electric", "Hybrid"];
  listOfTransmission = ["Manual", "Automatic"];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "OPEL", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "FIAT"];

  constructor(private adminService: AdminService,
    private activedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router) { }

    ngOnInit(){
      this.updateForm = this.fb.group({
        name: [null, Validators.required],
        brand: [null, Validators.required],
        type: [null, Validators.required],
        transmission: [null, Validators.required],
        year: [null, Validators.required],
        price: [null, Validators.required],
        description: [null, Validators.required],
      })
      this.getCarById();
    }

    getCarById(){
      this.isSpinning = true;
      this.adminService.getCarById(this.carId).subscribe((res)=>{
        //console.log(res);
        this.isSpinning = false;
        const carDto = res;
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
        console.log(carDto);
        console.log(this.existingImage);
        this.updateForm.patchValue(carDto);
      })
    }

    updateCar(){
      console.log(this.updateForm.value);
      this.isSpinning = true;
      const formData: FormData = new FormData();
      if(this.imgChanged && this.selectedFile){
        formData.append('image', this.selectedFile);
      }
      formData.append('brand', this.updateForm.get('brand').value);
      formData.append('name', this.updateForm.get('name').value);
      formData.append('type', this.updateForm.get('type').value);
      formData.append('year', this.updateForm.get('year').value);
      formData.append('transmission', this.updateForm.get('transmission').value);
      formData.append('price', this.updateForm.get('price').value);
      formData.append('description', this.updateForm.get('description').value);
      console.log(formData);
      this.adminService.updateCar(this.carId, formData).subscribe((res) => {
          this.isSpinning = false;
          this.message.success("Car updated successfully", { nzDuration: 5000 });
          this.router.navigateByUrl("/admin/dashboard");
          console.log(res);
        }, error => {
          this.isSpinning = false;
          this.message.error("Error while updating car!!", { nzDuration: 5000 })
        })
    }


    onFileSelected(event: any){
      this.selectedFile = event.target.files[0];
      this.imgChanged = true;
      this.existingImage = null;
      this.previewImage();
    }

    previewImage(){
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);
    }

}
