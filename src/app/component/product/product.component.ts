import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public loadSpinner: boolean = true;
  public productList: any;
  public CartItem:any = [];
  

  constructor(private api: ApiService, private cart: CartService,private router: Router, private util: UtilService) { 
    if(sessionStorage.getItem("CartItem")!=null){
      let CartItem_temp: any ;
      CartItem_temp = sessionStorage.getItem("CartItem");
      this.CartItem = JSON.parse(CartItem_temp);
    }
  }

  ngOnInit(): void {
 
    
   if(sessionStorage.getItem("ProductList")==null){ 
      this.api.getProduct()
      .subscribe(response =>{
        this.productList = response;
        this.productList.forEach((element: any) => {
          Object.assign(element,{quantity:1,total: element.price});

        });
        sessionStorage.setItem("ProductList",JSON.stringify(this.productList));
         this.loadSpinner = false;
    })
      
   }
   else{
    let productList_temp : any;
     productList_temp = sessionStorage.getItem("ProductList");
     this.productList = JSON.parse(productList_temp);
   }
 
   this.cart.addToCart();
    }


  counter(i: number){
    return this.util.counter(i);
  }

  addToCart(item: any){
   this.CartItem.push(item);
   sessionStorage.removeItem("CartItem");
   sessionStorage.setItem("CartItem",JSON.stringify(this.CartItem));
   this.cart.addToCart();
  }

  goToComponent(item: any){
    //this.cart.setCartIndex(item);
    sessionStorage.removeItem("PDetailItem");
    sessionStorage.removeItem("BrandList");
    sessionStorage.setItem("PDetailItem",JSON.stringify(item));
    let BrandList: any = [];
    let j=1;
    for(let i=0;i<this.productList.length;i++){
      if(this.productList[i].category == item.category && this.productList[i].ProductId!=item.ProductId){
         if(j<=4){
           BrandList.push(this.productList[i]);
        j++; 
        }
      }
    }
    sessionStorage.setItem("BrandList",JSON.stringify(BrandList));
    


  }

  getAmountFormat(price: number){
    return this.util.getAmountFormat(price);
   }

}
