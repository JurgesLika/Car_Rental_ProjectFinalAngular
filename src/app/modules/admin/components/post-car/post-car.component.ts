import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  postCarForm! : FormGroup;
  isSpinning:boolean = false;
  selectedFile: File | null | undefined;
  imagePreview: string | ArrayBuffer | null | undefined;
  listOfOption: Array<{label: string; value: string}>=[];
  listOfType = ["Petrol","Diesel","Electic","Hybrid"];
  listOfTransmission = ["Manual","Automatic"];
  listOfBrands = ["BMW","AUDI","MERCEDES","OPEL","TOYOTA","HONDA","FORD","NISSAN","HYNDAI","FIAT"];

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.postCarForm = this.fb.group({
      name: [null,Validators.required],
      brand: [null,Validators.required],
      type: [null,Validators.required],
      transmission: [null,Validators.required],
      price: [null,Validators.required],
      description: [null,Validators.required]
    })
  }
  postCar(){
    console.log(this.postCarForm.value);
    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('brand',this.postCarForm.get('brand')!.value);
    formData.append('name',this.postCarForm.get('name')!.value);
    formData.append('type',this.postCarForm.get('type')!.value);
    formData.append('year',this.postCarForm.get('year')!.value);
    formData.append('transmission',this.postCarForm.get('transmission')!.value);
    formData.append('price',this.postCarForm.get('price')!.value);
    formData.append('description',this.postCarForm.get('description')!.value);
    console.log(formData);

  }

  onFileSelected(event: any){
    this.selectedFile = event?.target.files[0];
    this.previewImage();
  }

  previewImage() {
    if (this.selectedFile) { // Ensure selectedFile is a File
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
