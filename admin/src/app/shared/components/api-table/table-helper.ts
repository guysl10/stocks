import {isUndefined, omit} from 'lodash';
import * as moment from 'moment';
import {DATE_FORMATS} from '../../shared/constants';
import {TableActionTypes} from './api-table.types';

const deleteActionClass = 'grid-action delete-action';
const editActionClass = 'grid-action edit-action';
const viewActionClass = 'grid-action view-action';

const renderCell = ({column, cellEvent, actions}) => {
  if (column.cellRenderer) {
    return column.cellRenderer(cellEvent);
  }
  if (column.isDate) {
    return moment(cellEvent.data[column.field]).format(DATE_FORMATS.LIST_DATE_TIME_FORMAT);
  }
  if (column.isActionColumn) {
    return (actions.includes(TableActionTypes.View) ? `<a class="${viewActionClass}">View</a>&nbsp;` : '')
      + (actions.includes(TableActionTypes.Edit) ? `<a class="${editActionClass}">Edit</a>&nbsp;` : '')
      + (actions.includes(TableActionTypes.Delete) ? `<a class="${deleteActionClass}">Delete</a>` : '');
  }
  const returnValue = cellEvent.data[column.field]?.toString();
  if (column.isDollar) {
    return `$${returnValue}`;
  }
  return returnValue;
};

const onCellClicked = async ({
                               column, cellClickEvent, onDeleteRow, onEditRow, onViewRow,
                             }) => {
  if (column.isActionColumn) {
    const {className} = cellClickEvent.event.target;
    if (className === deleteActionClass) {
      const confirmDelete = window.confirm('Are you sure, you want to delete this record?');
      if (!confirmDelete) {
        return;
      }
      try {
        await onDeleteRow.emit(cellClickEvent);
      } catch (e) {
      }
    }
    if (className === editActionClass) {
      onEditRow.emit(cellClickEvent);
    }
    if (className === viewActionClass) {
      onViewRow.emit(cellClickEvent);
    }
  }
};

const __getUserDetailsForRender = ({event, key}) => {
  const userData = event.data[key];
  if (!userData) {
    return '';
  }
  return `${userData.firstName} ${userData.lastName}`;
}

export const processColumnDefs = ({
                                    columns, onDeleteRow, onEditRow, onViewRow, actions,
                                  }) => {
  const returnColumns = [];
  const createUpdateFields = [
    {field: 'createdAt', isDate: true, filter: 'agDateColumnFilter'},
    {field: 'updatedAt', isDate: true, filter: 'agDateColumnFilter'},
    {
      field: 'createdBy',
      sortable: false,
      cellRenderer: (event) => __getUserDetailsForRender({event, key: 'createdBy'})
    },
    {field: 'updatedBy', sortable: false, cellRenderer: (event) => __getUserDetailsForRender({event, key: 'updatedBy'})}
  ];
  [...columns, ...createUpdateFields].forEach((column) => {
    let filterEnabled = !isUndefined(column.filter) ? column.filter : true;
    let sortable = !isUndefined(column.sortable) ? column.sortable : true;
    let resizable = !isUndefined(column.resizable) ? column.sortable : true;
    let width = !isUndefined(column.width) ? column.width : undefined;
    if (column.isActionColumn) {
      sortable = false;
      filterEnabled = false;
      resizable = false;
      width = 130;
    }
    returnColumns.push({
      ...omit(column, ['isActionColumn', 'isDate', 'title', 'onEdit', 'onDelete']),
      filter: filterEnabled,
      resizable,
      width,
      filterParams: filterEnabled ? {
        buttons: ['reset', 'apply'],
        suppressAndOrCondition: true,
        textCustomComparator: () => true,
        filterOptions: column.isDate ? [
          'inRange',
          {displayKey: 'inRange', displayName: 'inRange', test: () => true}
        ] : ['contains'],
        debounceMs: 200,
      } : undefined,
      sortable,
      field: column.title || column.field,
      cellRenderer: (cellEvent) => renderCell({column, cellEvent, actions}),
      onCellClicked: (cellClickEvent) => onCellClicked({
        column, cellClickEvent, onDeleteRow, onEditRow, onViewRow,
      }),
    });
  });
  return returnColumns;
};

const getAPIKey = ({fieldKey, columns}) => {
  let returnKey = '';
  if (!fieldKey) {
    return returnKey;
  }
  Object.keys(columns).forEach((columnKey) => {
    if (columns[columnKey].field === fieldKey || columns[columnKey].title === fieldKey) {
      returnKey = columns[columnKey].field;
    }
  });
  return returnKey;
};

export const getSortParams = ({gridAPI, columns}) => {
  const sortData = gridAPI.getSortModel()[0] || {colId: undefined, sort: undefined};
  const sortBy = getAPIKey({fieldKey: sortData.colId, columns});
  const sortDirection = sortData.sort;
  return {sortBy, sortDirection};
};

export const getFilterParams = ({gridAPI, columns}) => {
  const filterData = gridAPI.getFilterModel();
  const returnValue = {};
  for (const filterKey of Object.keys(filterData)) {
    if (filterKey === 'createdAt' || filterKey === 'updatedAt') {
      returnValue[filterKey] = JSON.stringify({...filterData[filterKey], timezone: moment().format('Z')});
    } else {
      const apiKey = getAPIKey({fieldKey: filterKey, columns});
      returnValue[apiKey || filterKey] = filterData[filterKey].filter;
    }
  }
  return returnValue;
};
