import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
orderData:order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
 this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result
    })
  }

}
