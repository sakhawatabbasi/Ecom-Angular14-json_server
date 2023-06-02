import { Component,OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
  showLogin=false;
  
  authError:string="";
  
  constructor( private seller:SellerService){}


  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data:signUp):void{
    this.seller.userSignUp(data);
   
  }

  login(data:signUp):void{
    this.authError="";
    //console.warn(data)
     this.seller.userLogin(data)
     this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is and correct"
      }
    })
  }

  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
