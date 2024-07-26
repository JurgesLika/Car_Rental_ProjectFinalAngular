import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/service/storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASIC_URL = "http://localhost:9000";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarBookings(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/bookings`, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/admin/car/search`, searchCarDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar(carId: number, carDto: any): Observable<any> {
    return this.http.put(`${BASIC_URL}/api/admin/car/${carId}`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    console.log('Token:', token); // Debugging: Check if the token is correctly fetched
    if (token) {
      authHeaders = authHeaders.set('Authorization', `Bearer ${token}`);
      console.log('Authorization Header:', authHeaders); // Debugging: Check the headers
    } else {
      console.warn('No token found'); // Debugging: Warn if no token is found
    }
    return authHeaders;
  }
}
