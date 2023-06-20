import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-pdetails',
  templateUrl: './pdetails.component.html',
  styleUrls: ['./pdetails.component.css']
})
export class PdetailsComponent implements OnInit {

   public item : any
   public brandList : any = [];
   public CartItem:any = [];
   public productList: any;
  constructor(private cart: CartService, private util: UtilService,private api: ApiService) {
   // sessionStorage.removeItem('brandList');
   if(sessionStorage.getItem("CartItem")!=null){
    let CartItem_temp: any ;
    CartItem_temp = sessionStorage.getItem("CartItem");
    this.CartItem = JSON.parse(CartItem_temp);
  }

   }

  ngOnInit(): void {
    
    let item_temp : any;
    item_temp = sessionStorage.getItem("PDetailItem");
    this.item = JSON.parse(item_temp);

    let brandList_temp : any = [];
    brandList_temp = sessionStorage.getItem("BrandList");
    this.brandList = JSON.parse(brandList_temp);
    //console.log(this.brandList);
    
     this.cart.addToCart();
      
  }

  addToCart(item: any){
    this.CartItem.push(item);
    sessionStorage.removeItem("CartItem");
    sessionStorage.setItem("CartItem",JSON.stringify(this.CartItem));
    this.cart.addToCart();
   }

  counter(i: number){
    return this.util.counter(i);
  }

  getAmountFormat(price: number){
    return this.util.getAmountFormat(price);
   }

   goToComponent(item: any){
   // this.cart.setCartIndex(item);
   sessionStorage.removeItem("PDetailItem");
  sessionStorage.removeItem("BrandList");
  sessionStorage.setItem("PDetailItem",JSON.stringify(item));
  let productList_temp: any;
  productList_temp = sessionStorage.getItem("ProductList");
  this.productList = JSON.parse(productList_temp);
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
  location.reload();  
  }


}
