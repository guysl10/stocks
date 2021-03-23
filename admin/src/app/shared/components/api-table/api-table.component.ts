import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AppUtil} from '../../services/app-util.service';
import {TableActionTypes} from './api-table.types';
import {getFilterParams, getSortParams, processColumnDefs} from './table-helper';

@Component({
  selector: "app-api-table",
  templateUrl: "./api-table.component.html",
  styleUrls: ['./api-table.component.scss']
})
export class APITable {
  constructor(private appUtil: AppUtil) {
  }

  columnDefs;
  isLoading = false;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;
  apiFilterData;
  rowData = [];
  gridAPI;
  columns;
  @Output() onEditRow = new EventEmitter();
  @Output() onDeleteRow = new EventEmitter();
  @Output() onViewRow = new EventEmitter();
  @Input() actions = [TableActionTypes.Edit, TableActionTypes.Delete];
  @Input() gridDataService;

  @Input() set gridColumns(columnData) {
    this.columns = columnData;
    setTimeout(() => {
      this.columnDefs = processColumnDefs({
        columns: columnData,
        onEditRow: this.onEditRow,
        onDeleteRow: this.onDeleteRow,
        onViewRow: this.onViewRow,
        actions: this.actions
      });
    }, 200);
  }

  onGridReady(event) {
    if (!this.gridAPI) {
      this.gridAPI = event.api;
    }
    this.setGridData();
  }

  onPageChange(newPage) {
    this.setGridData({page: newPage});
  }

  async setGridData({page = this.currentPage, fromRefresh = false}:
                      { page?: number, fromRefresh?: boolean } = {}) {
    const filterModel = this.gridAPI.getFilterModel();
    try {
      this.isLoading = true;
      this.gridAPI.showLoadingOverlay();
      const apiFilterData = {
        page,
        ...getSortParams({gridAPI: this.gridAPI, columns: this.columns}),
        ...getFilterParams({gridAPI: this.gridAPI, columns: this.columns}),
      };
      if (!fromRefresh && this.appUtil.isSameObjectValue({obj1: this.apiFilterData, obj2: apiFilterData})) {
        return;
      }
      const response = await this.gridDataService(apiFilterData);
      this.rowData = response.records;
      this.totalPages = response.totalPages;
      this.totalRecords = response.totalCount;
      this.currentPage = response.page;
      this.apiFilterData = apiFilterData;
      setTimeout(() => this.gridAPI.setFilterModel(filterModel), 200);
    } catch (e) {
      console.error('Error in getting the data.', e);
    } finally {
      this.isLoading = false;
      this.gridAPI.hideOverlay();
    }
  };
}
