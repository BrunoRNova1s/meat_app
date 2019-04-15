import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model'
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-20px, -10px)'}),
        animate('100ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  /* sempre que há uma propriedade que vai receber um dado é ncessário o decorator Input */
  /* Restaurant é o tipo, que é importado do ficheiro RestaurantComponent.model */

  @Input() restaurant: Restaurant 

  constructor() { }

  ngOnInit() {
  }

}
