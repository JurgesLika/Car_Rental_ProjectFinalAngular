import { Component, OnInit } from '@angular/core';  // Import OnInit
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']  // Fixed typo here
})
export class MyBookingsComponent implements OnInit {  // Implement OnInit

  bookings: any[] = [];  // Initialize as an empty array
  isSpinning = false;

  constructor(private service: CustomerService) {}

  ngOnInit(): void {  // Lifecycle hook for initialization
    this.getMyBookings();  // Fetch bookings on component initialization
  }

  getMyBookings(): void {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log(res);
        this.bookings = res;
      },
      error: (err) => {
        this.isSpinning = false;
        console.error(err);
      }
    });
  }
}
