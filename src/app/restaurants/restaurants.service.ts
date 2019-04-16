/* Esta é a classe que acede ao backend */

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Restaurant } from "./restaurant/restaurant.model";

import { MEAT_API } from "../app.api";
import { ErrorHandler } from "app/app.error-handler";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) {}

  /* Permitir a pesquisa (parametro search) */
  restaurants(search?: string): Observable<Restaurant[]> {
    return this.http
      .get(`${MEAT_API}/restaurants`, {
        params: { q: search }
      }) /* o q permite que a (query) pesquisa seja feita em todos os elemtos | json serve permite isso */
      .map(response => response.json())
      .catch(
        ErrorHandler.handleError
      ); /* utilizado para exibir erro no console | vai utilizar o metodo handleError da função ErrorHandler */
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/menu`)
      .map(response => response.json())
      .catch(ErrorHandler.handleError);
  }
}
