

import { Component } from '@angular/core';
import { StorageService } from './auth/components/service/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myapp';

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  loading: any;

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }

}
