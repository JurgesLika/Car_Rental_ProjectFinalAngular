import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/service/storage/storage.service';

const BASIC_URL = "http://localhost:9000";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars", {
      headers: this.createAuthorizationHeader()
    });
  }
  getCarById(carId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/" + carId, {
      headers: this.createAuthorizationHeader()
    });
  }
  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/book" , bookACarDto, {
      headers: this.createAuthorizationHeader()
    })
  }
  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/" + StorageService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });
  }
  

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    console.log('Token:', token); // Check if the token is correctly fetched
    if (token) {
      authHeaders = authHeaders.set('Authorization', `Bearer ${token}`);
      console.log('Authorization Header:', authHeaders); // Check the headers
    } else {
      console.warn('No token found'); // Warn if no token is found
    }
    return authHeaders;
  }
}
