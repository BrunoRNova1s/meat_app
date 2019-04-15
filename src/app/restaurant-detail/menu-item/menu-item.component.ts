import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MenuItem } from "./menu-item.model";

@Component({
  selector: "mt-menu-item",
  templateUrl: "./menu-item.component.html"
})
export class MenuItemComponent implements OnInit {
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
