import {CellClickedEvent, ColDef} from 'ag-grid-community';

export interface ITableColumn extends ColDef {
  title?: string,
  isDate?: boolean,
  isDollar?: boolean,
  isActionColumn?: boolean,
  onEdit?: (event: CellClickedEvent) => void | Promise<void>,
  onDelete?: (event: CellClickedEvent) => void | Promise<void>
}
export enum TableActionTypes {
  View, Edit, Delete
}
