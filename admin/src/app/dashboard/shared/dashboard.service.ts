import {Injectable} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {LocalStorageService} from '../../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  redirectUrl: string;

  constructor(private dataService: DataService, private localStorage: LocalStorageService) {
  }

  async getCount({startDate, endDate}) {
    return await this.dataService.callAPI({
      url: '/api/v1/dashboard/get-counts',
      search: {startDate, endDate},
    }).toPromise();
  }

  async getOrderChartData({startDate, endDate, timezone}) {
    return await this.dataService.callAPI({
      url: '/api/v1/dashboard/get-daily-order-counts',
      search: {startDate, endDate, timezone},
    }).toPromise();
  }
}
