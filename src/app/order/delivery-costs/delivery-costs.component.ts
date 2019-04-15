import { Component, OnInit, Input } from '@angular/core';

import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model'

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html',
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery: number
  @Input() itemsValue: number
  
  constructor() { }

  ngOnInit() {
  }

  total() {
    return this.delivery + this.itemsValue
  }
}
