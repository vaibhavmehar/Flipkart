import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 


  constructor(private http: HttpClient) { }

  getProduct(){
  var data : any = [];
  var row1 : any = {};
 
 //   return this.http.get<any>("https://fakestoreapi.com/products")
return this.http.get<any>("https://script.google.com/macros/s/AKfycbyO9V3Sc8GSY8Inhjv-u_ON5sffJ0Tr6SL0EEFEDPQ13bIxkR7std1TM_hhtu5ps_Cj/exec?Sheetname=Product")
    .pipe(map((response:any) => {
    for(let i=1; i<=response.length-1;i++){
          row1 = {};
          row1[response[0][0]] = response[i][0];
          row1[response[0][1]] = response[i][1];
          row1[response[0][2]] = response[i][2];
          row1[response[0][3]] = response[i][3];
          row1[response[0][4]] = response[i][4];
          row1[response[0][5]] = response[i][5];
          row1[response[0][6]] = response[i][6];
          row1[response[0][7]] = response[i][7];
          row1[response[0][8]] = response[i][8];
          row1[response[0][9]] = response[i][9];
          row1[response[0][10]] = response[i][10];
          row1[response[0][11]] = response[i][11];
          row1[response[0][12]] = response[i][12];
          data.push(row1);
      }
      
       return data;
    }));
  
  }
}
