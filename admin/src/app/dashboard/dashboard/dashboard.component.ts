import {Component, OnInit} from "@angular/core";
import * as moment from 'moment';
import {Moment} from 'moment';
import {DashboardService} from '../shared/dashboard.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {
  }

  orderChartData = [];
  isLoading: boolean = false;
  selectedDateRange: { startDate: Moment, endDate: Moment } = {
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  };
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  totalItems = [
    {title: 'Total Orders', count: 0},
    {title: 'Total Order Amount', isMoney: true, count: 0},
    {title: 'New Products', count: 0},
    {title: 'New Users', count: 0}
  ];

  ngOnInit() {
    this.setDashboardData();
  }

  async setDashboardData(dateRange = this.selectedDateRange) {
    if (this.isLoading) {
      return;
    }
    try {
      this.isLoading = true;
      const queryDateRange = {
        startDate: dateRange.startDate.format('x'),
        endDate: dateRange.endDate.format('x'),
        timezone: moment().format('Z')
      };
      const countData = await this.dashboardService.getCount(queryDateRange);
      this.orderChartData = await this.dashboardService.getOrderChartData(queryDateRange);
      this.totalItems[0].count = countData.totalOrders;
      this.totalItems[1].count = countData.totalOrderAmount;
      this.totalItems[2].count = countData.newProducts;
      this.totalItems[3].count = countData.newUsers;
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  async onRangeUpdate(dateRange) {
    await this.setDashboardData(dateRange);
  }
}
