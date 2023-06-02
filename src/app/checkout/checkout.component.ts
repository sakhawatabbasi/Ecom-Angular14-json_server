import { Component, OnInit } from '@angular/core';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
totalPrice:number| undefined
cartData:cart[]|undefined
orderMsg:string|undefined
  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result)=>{
      this.cartData=result
      let price=0;
      result.forEach((item)=>{
        if(item.quantity){
        price=price+(+item.price * + item.quantity)
        }
      })
      this.totalPrice=price+(price/10)+100-(price/10); 
      console.warn(this.totalPrice);
      
      })
  }


  ordernow(data:order){
    let user =localStorage.getItem('user')
    let userId= user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData={
        ...data,
        totalPrice:this.totalPrice,
        userId
      } 
      this.cartData?.forEach((item)=>{
        setTimeout(() => {
       item.id && this.product.deleteCartItems(item.id) 
        }, 700);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          // alert('Order Placed Successfully')
          this.orderMsg="Your Order Has Been Placed";
          setTimeout(() => {
            this.router.navigate(['/myorder'])
            this.orderMsg=undefined
          }, 3000);
        }
      })
    }
  
    
  }
}
