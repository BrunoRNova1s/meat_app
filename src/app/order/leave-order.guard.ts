import {
  CanDeactivate,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { OrderComponent } from "./order.component";

/* componente que se está a associar o <canDeactivate> */

export class LeaveOrderGuard implements CanDeactivate<OrderComponent> {
  canDeactivate(
    orderComponent: OrderComponent,
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    if (!orderComponent.isOrderCompleted()) {
      return window.confirm("Deseja desistir da compra?");
    } else {
      return true;
    }
  }
}
