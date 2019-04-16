import { Component, OnInit } from "@angular/core";

import { Restaurant } from "./restaurant/restaurant.model";
import { RestaurantsService } from "./restaurants.service";

import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/do"
import "rxjs/add/operator/debounceTime"
import "rxjs/add/operator/distinctUntilChanged"

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  animations: [
    trigger("toggleSearch", [
      state(
        "hidden",
        style({
          opacity: 0,
          "max-height": "0px"
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          "max-height": "70px",
          "margin-top": "20px"
        })
      ),
      transition("* => *", animate("250ms 0s ease-in-out"))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {
  searchBarState = "hidden";
  restaurants: Restaurant[];

  searchForm: FormGroup;
  searchControl: FormControl;

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) {}

  /* lifecycle do componente */
  ngOnInit() {
    this.searchControl = this.fb.control("");
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    /* saber o que é digitado | quando valor muda*/
    /* debounce - espera que passe x tempo ate fazer o pedido ao server */
    /* se a mensagem seguinte for igual à anterior, ele vai ignorar */
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      /* .do(searchTerm=> console.log(`q=${searchTerm}`)) */
      /* o switchmap evita que os request se subreponham - portanto deve utilizar se */
      .switchMap(searchTerm => this.restaurantsService.restaurants(searchTerm))
      .subscribe(restaurants => (this.restaurants = restaurants));

    this.restaurantsService.restaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      console.log("-----data RESTAURANTES-----", restaurants);
    });
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === "visible" ? "hidden" : "visible";
  }
}
