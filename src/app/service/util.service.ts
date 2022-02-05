import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  counter(i: number){
    let s = i.toString().split('.');
    let k : number;
    k=Number(s[0]);
    let a = [0,0,0,0,0];
    for(let j=0;j<k;j++){
        a[j]=1;
    }
    if(s[1] != undefined){
      a[k]=0.5;
    }
    return a;
  }




  getAmountFormat(price: number) {
    let firstplace=price.toString().split('.')[0];
    let secondplace=price.toString().split('.')[1];
    let result;
    if(secondplace == undefined){
        result =  firstplace + ".00";
    }else if(secondplace.length == 1){
        result = firstplace + "." + secondplace + "0";
    }else {
      result = price.toFixed(2);
    }
  
      return result;
    }



}

