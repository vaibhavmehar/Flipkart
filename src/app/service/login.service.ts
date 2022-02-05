import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }


doLogin(username:any, password: any){
  return this.http.get(`https://script.google.com/macros/s/AKfycbyO9V3Sc8GSY8Inhjv-u_ON5sffJ0Tr6SL0EEFEDPQ13bIxkR7std1TM_hhtu5ps_Cj/exec?username=` + username + "&password=" + password + "&Sheetname=Login");
}
  loginUser(username: any){
    sessionStorage.setItem("Username",username)
    return true;
  }

  isLoggedIn(){
    let username = sessionStorage.getItem("Username");
    if(username == undefined || username === '' || username == null){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    sessionStorage.removeItem("Username");
    return true;
  }

  getUsername(){
    return sessionStorage.getItem("Username");
  }

}
