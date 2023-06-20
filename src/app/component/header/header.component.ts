import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormsModule, SelectMultipleControlValueAccessor } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public showotp: boolean = false;
  public clicked: boolean = false;
  public credentials = {
    username:'',
    password:''
  }
  public loadButton: boolean = false;
  public InvalidCredentials: boolean = false;
  

  public username:any = '';
    
  
  constructor(private cart: CartService,private login: LoginService,private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("Username")!=null){
      this.username = sessionStorage.getItem("Username");
    }

    this.cart.getProducts()
    .subscribe(response => {
      
      this.totalItem = response==null?0:response.length;
      
    //  console.log(this.totalItem);
    })

   

  }

  logout(){
    this.username = '';  
    this.login.logout();        
    this.router.navigate(['./product']);
  }

  ResetCredentials(){
    this.credentials.username = "";
    this.credentials.password = "";
    this.InvalidCredentials = false;

  }

  getUsername(){
    this.username = this.login.getUsername();

   if(this.username == null){
       return false;
    }
    else {
      return true;
    }
  }

  onSubmit(){
   this.loadButton = true;
   this.login.doLogin(this.credentials.username,this.credentials.password).subscribe(
     (response:any) => {
     console.log(response);
      if(response[0].error == null)
     { 
          console.log(response[0].Name);
          this.login.loginUser(response[0].Name);
          location.reload();
     }
     else
     {
       this.loadButton = false;
       this.InvalidCredentials = true;
       this.credentials.username = "";
       this.credentials.password = "";
        
     }
    }
   )
  }




  al(){
    alert("Hello");
  }

  ResetsendOtp(){
 
    if(this.showotp == true){
      this.showotp=false;
      this.clicked = false;
    }
         
  }

  sendOtp(){
    
    this.showotp=!this.showotp;
         
  }
}
