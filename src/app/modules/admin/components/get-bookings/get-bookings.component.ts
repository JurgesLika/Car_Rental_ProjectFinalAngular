import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
[x: string]: any;

  bookings: any[] = [];
  isSpinning = false;

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ){
    this.getBookings();
  }

  getBookings(){
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe((res)=>{
      this.isSpinning =  false;
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number,status: string){
    this.isSpinning = true;
    console.log(bookingId,status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res)=>
    {
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Booking status changed successfuly!", {nzDuration: 5000});
    },error =>{
      this.message.error("Something went wrong!!", {nzDuration: 5000});
    })
  }

}
