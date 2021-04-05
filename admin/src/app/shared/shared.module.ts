import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {FormComponent} from './components/form-item-builder/form-item-builder.component';
import {AgGridModule} from 'ag-grid-angular';
import {APITable} from './components/api-table/api-table.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {AppSecondaryHeaderComponent} from './components/app-secondary-header/app-secondary-header.component';

const components = [FormComponent, APITable, AppSecondaryHeaderComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbPaginationModule, AgGridModule.withComponents([])],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, ...components]
})
export class SharedModule {
}
