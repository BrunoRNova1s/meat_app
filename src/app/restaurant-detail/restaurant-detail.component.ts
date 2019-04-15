import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "../restaurants/restaurants.service";
import { Restaurant } from "../restaurants/restaurant/restaurant.model";

@Component({
  selector: "mt-restaurant-detail",
  templateUrl: "./restaurant-detail.component.html"
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.restaurantsService
      .restaurantById(this.route.snapshot.params["id"]) /* snapshot : estado dos parametros */
      .subscribe(restaurant => (this.restaurant = restaurant));
    console.log("-----data restaurant id-----", this.route.snapshot.params["id"])
  }
}
