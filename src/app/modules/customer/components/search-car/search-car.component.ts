import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  listOfType = ["Petrol", "Diesel", "Electric", "Hybrid"];
  listOfTransmission = ["Manual", "Automatic"];
  listOfBrands = ["BMW", "AUDI", "MERCEDES", "OPEL", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "FIAT", "LAND ROVER"];
  isSpinning = false;
  cars: any[] = [];

  constructor(private fb: FormBuilder, 
    private service: CustomerService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
    });
  }

  searchCar() {
    this.isSpinning = true;
    this.service.searchCar(this.searchCarForm.value).subscribe(
      (res) => {
        this.cars = res.carDtoList.map((element: any) => ({
          ...element,
          processedImg: 'data:image/jpeg;base64,' + element.returnedImage,
        }));
        this.isSpinning = false;
      },
      (err) => {
        console.error('Error searching cars:', err);
        this.isSpinning = false;
      }
    );
  }
}
