import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public cartItem: any;

  constructor(private http: HttpClient) {
    // let productList_temp : any;
    // if(sessionStorage.getItem("CartItem")!=null){
    // productList_temp = sessionStorage.getItem("CartItem");
    // this.productList = JSON.parse(productList_temp);
    // console.log(this.productList);
    // }

   }
  
   getProducts(){      
       return this.productList.asObservable();
   }

   setProduct(product: any){
     this.cartItemList.push(product);
     this.productList.next(product);
   }

   addToCart(){
     let cartItemList: any;
     cartItemList = sessionStorage.getItem("CartItem")
     this.cartItemList = JSON.parse(cartItemList);
     this.productList.next(this.cartItemList);
       
   }

   getCartItem(){
     return this.cartItemList;
   }


   getTotalPrice(): number{
     let grandTotal = 0;
     this.cartItemList.map((a:any)=>{
       grandTotal += a.Oprice;
     })
     return grandTotal;
   }

   getOfferPrice(): number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.price;
    })
    return grandTotal;
  }

   removeCartItem(product: any,index: any){
     console.log(this.cartItemList);
    //  this.cartItemList.map((a: any, index: any) => {
    //     if(product.ProductId === a.ProductId ){
      
          this.cartItemList.splice(index,1);
        // }
  //   })
     this.productList.next(this.cartItemList);
   }

   removeAll(){
     this.cartItemList = [];
     this.productList.next(this.cartItemList);
   }

   setCartIndex(product: any){
      sessionStorage.setItem("CartItem",JSON.stringify(product));
      sessionStorage.removeItem('brandList');
      this.cartItem = product;
   }

   getCartIndex(): any{
        return this.cartItem;
   }

   placeOrder(product: any,Username: any){
   //  console.log(product);
    return this.http.post(`https://script.google.com/macros/s/AKfycbyO9V3Sc8GSY8Inhjv-u_ON5sffJ0Tr6SL0EEFEDPQ13bIxkR7std1TM_hhtu5ps_Cj/exec?&Sheetname=Cart&Username=` + Username,JSON.stringify(product));
   }

}
