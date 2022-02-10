import { Component, OnInit } from '@angular/core';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public Orders: any;
  constructor(private api: ApiService) { }
   

  ngOnInit(): void {   
      
           this.api.getOrderData().subscribe(
            (response:any)=>{
              console.log(response);
              this.Orders = response;
            }
          )
      }
  

}
