import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UtilService } from 'src/app/service/util.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public product: any = [];
  public grandTotal: number = 0;
  public offerPrice : number = 0;
  public discountPrice: number = 0;
  public productList: any;
  public loadButton: boolean = false;
  constructor(private cart: CartService, private util: UtilService) { }
  
  ngOnInit(): void {
   
    if(sessionStorage.getItem("CartItem")!=null){
    let product_temp:any;
    product_temp = sessionStorage.getItem("CartItem");
    this.product = JSON.parse(product_temp);
    }

    for(let i=0;i<this.product.length;i++){
      this.grandTotal += this.product[i].Oprice;
      this.offerPrice += this.product[i].price;
    }
    this.discountPrice =  this.grandTotal - this.offerPrice
    this.cart.addToCart();
    // this.cart.getProducts()
    // .subscribe(response=>{
    //   console.log(response);
    //   this.product = response;
    //   this.grandTotal = this.cart.getTotalPrice();
    //   this.offerPrice = this.cart.getOfferPrice();
    //   this.discountPrice =  this.grandTotal - this.offerPrice
    // })
   
  }

  counter(i: number){
    return this.util.counter(i);
  }

  goToComponent(item: any){
  //  this.cart.setCartIndex(item);
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
  }

  removeItem(item: any, index: any){
    // console.log(item + " index: " + index);
    // this.cart.removeCartItem(item,index);
    // this.grandTotal = 0;
    // this.cart.getProducts()
    // .subscribe(response=>{
    //   this.product = response;
    //   this.grandTotal = this.cart.getTotalPrice();
    // })
    this.product.splice(index,1);
    sessionStorage.removeItem("CartItem");
    sessionStorage.setItem("CartItem",JSON.stringify(this.product));
    this.grandTotal = 0;
    this.offerPrice = 0;
    for(let i=0;i<this.product.length;i++){
      this.grandTotal += this.product[i].Oprice;
      this.offerPrice += this.product[i].price;
    }
    this.discountPrice =  this.grandTotal - this.offerPrice
    this.cart.addToCart();
  }

  getAmountFormat(price: number){
   return this.util.getAmountFormat(price);
  }

  placeOrder(){
   // console.log(JSON.stringify(this.product));
   this.loadButton = true;
   this.cart.placeOrder(this.product, sessionStorage.getItem("Username")).subscribe(
     (response:any) => {
       console.log(JSON.stringify(response));
       this.RemoveAll();
       this.loadButton = false;
     }
   )
  }

  RemoveAll(){
    sessionStorage.removeItem("CartItem");
    this.product = [];
    this.cart.addToCart();    
  }

}
