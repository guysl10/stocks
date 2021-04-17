import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: "view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {
  orderData;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.orderData = this.route.snapshot.data.order;
    console.log(this.orderData);
  }
}
