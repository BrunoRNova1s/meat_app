import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
})
export class RestaurantComponent implements OnInit {

  /* sempre que há uma propriedade que vai receber um dado é ncessário o decorator Input */
  /* Restaurant é o tipo, que é importado do ficheiro RestaurantComponent.model */

  @Input()  restaurant: Restaurant 

  constructor() { }

  ngOnInit() {
  }

}
