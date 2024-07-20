import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any) => {
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

  deleteCar(id: number){
    console.log(id);
    this.adminService.deleteCar(id).subscribe((res)=>{
      this.getAllCars();
      this.message.success("Car deleted successfuly",{nzDuration: 5000});
    })
  }
}
