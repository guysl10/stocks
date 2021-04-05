import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {APITable} from 'src/app/shared/components/api-table/api-table.component';
import {ITableColumn} from 'src/app/shared/components/api-table/api-table.types';
import {ProductService} from '../shared/product-service';

@Component({
  selector: "product-list",
  templateUrl: "./product-list.component.html"
})
export class ProductListComponent {
  constructor(private productSerivce: ProductService,
              private router: Router) {
  }

  getProductData = this.productSerivce.getProductData.bind(this.productSerivce);
  @ViewChild(APITable) apiTable: APITable;

  gotoEditProduct(cellClickEvent) {
    const productId = cellClickEvent.data._id;
    this.router.navigateByUrl(`/products/${productId}/edit`);
  }

  async deleteProduct(cellClickEvent) {
    const productId = cellClickEvent.data._id;
    try {
      await this.productSerivce.deleteProduct(productId);
      await this.apiTable.setGridData({fromRefresh: true});
    } catch (e) {
    }
  }

  columns: Array<ITableColumn> = [
    {field: 'action', isActionColumn: true},
    {field: 'name', flex: 1, minWidth: 200},
    {field: 'price', isDollar: true},
    {field: 'size'},
    {field: 'color'},
    {
      title: 'Home Page Product', filter: false, field: 'isHomePageProduct',
      cellRenderer: ({data}) => {
        return data.isHomePageProduct ? 'Yes' : 'No';
      }
    },
  ];
}
