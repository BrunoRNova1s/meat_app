import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "./menu-item.model";
import { trigger, state, transition, style, animate } from '@angular/animations';


@Component({
  selector: "mt-menu-item",
  templateUrl: "./menu-item.component.html",
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translate(-20px)'}),
        animate('100ms 0s ease-in')
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'

  /* criar uma propriedade que representa um item do menu, para que o parent passe os valores */
  /* Como é o parent a informar o valor é necessário o @Input */

  @Input() menuItem: MenuItem;
  @Output() add = new EventEmitter()

  constructor() {}

  ngOnInit() {}

  emitAddEvent(){
    /* dá acesso ao controlo por parte do parent */ 
    this.add.emit(this.menuItem) 
  }
}
