import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  cars: any = [];


  constructor(private service: CustomerService) { }

  
  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.service.getAllCars().subscribe((res: any) => {
      console.log('API Response:', res);
      // Assuming res is an array of cars directly
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
    }, (error: any) => {
      console.error('Error fetching cars:', error);
    });
  }

}
