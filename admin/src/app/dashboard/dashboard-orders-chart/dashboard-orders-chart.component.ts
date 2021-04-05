import {Component, Input, ViewChild} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Color, BaseChartDirective, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';

@Component({
  selector: "app-dashboard-orders-chart",
  templateUrl: "./dashboard-orders-chart.component.html",
})
export class DashboardOrdersChartComponent {
  orderChartData = [{data: [], label: 'Orders'}];
  @Input() dateRange;

  @Input() set orderData(orderCounts) {
    if (this.dateRange) {
      this.lineChartLabels = [];
      this.orderChartData[0].data = [];

      const loopDate = moment(this.dateRange.startDate);
      const currentDate = moment();
      let maxCount = 100000;
      while (!loopDate.isAfter(this.dateRange.endDate) && !loopDate.isAfter(currentDate)) {
        const formattedDate = loopDate.format('YYYY-MM-DD');
        const orderCountData = orderCounts.find((record) => formattedDate === record.date) || {count: 0};
        this.lineChartLabels.push(formattedDate);
        this.orderChartData[0].data.push(orderCountData.count);
        loopDate.add(1, 'day');
        maxCount--
        if (maxCount < 0) {
          break;
        }
      }
      this.chart.update();
    }
  }

  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{id: 'y-axis-0', position: 'left'}]
    },
    annotation: {},
  };
  public lineChartColors: Color[] = [{
    backgroundColor: 'rgba(192,94,53,0.2)',
    borderColor: 'rgba(192,94,53,1)',
    pointBackgroundColor: 'rgba(192,94,53,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(192,94,53,0.8)'
  }];
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
}
