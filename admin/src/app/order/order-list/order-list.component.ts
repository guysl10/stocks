import {Component, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {APITable} from 'src/app/shared/components/api-table/api-table.component';
import {ITableColumn, TableActionTypes} from 'src/app/shared/components/api-table/api-table.types';
import {OrderService} from '../shared/order-service';

@Component({
  selector: "order-list",
  templateUrl: "./order-list.component.html"
})
export class OrderListComponent {
  constructor(private orderSerivce: OrderService,
              private router: Router) {
  }

  orderTableActions = [TableActionTypes.View, TableActionTypes.Delete];
  getOrderData = this.orderSerivce.getOrderData.bind(this.orderSerivce);
  @ViewChild(APITable) apiTable: APITable;

  gotoOrderDetail(cellClickEvent) {
    const orderId = cellClickEvent.data._id;
    this.router.navigateByUrl(`/orders/${orderId}`);
  }

  async deleteOrder(cellClickEvent) {
    const orderId = cellClickEvent.data._id;
    try {
      await this.orderSerivce.deleteOrder(orderId);
      await this.apiTable.setGridData({fromRefresh: true});
    } catch (e) {
    }
  }

  columns: Array<ITableColumn> = [
    {field: 'action', isActionColumn: true},
    {field: 'orderId', flex: 1, minWidth: 200},
    {field: 'totalAmount', isDollar: true},
  ];
}
