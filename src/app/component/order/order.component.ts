import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public Orders: any; 
  public loadSpinner: boolean = true;
  constructor(private api: ApiService, private login: LoginService, private router: Router) { }


  ngOnInit(): void {   
    if(!this.login.isLoggedIn()){
        this.router.navigate(['./product']);
    }
    
          this.api.getOrderData().subscribe(
            (response:any)=>{
              console.log(response);
              this.Orders = response;
              this.loadSpinner = false;
            }          
          )
         
      }
  

}
