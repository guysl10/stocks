import {Component, OnInit, ViewChild} from "@angular/core";
import {Router} from '@angular/router';
import {APITable} from 'src/app/shared/components/api-table/api-table.component';
import {ITableColumn} from 'src/app/shared/components/api-table/api-table.types';
import {SocketService} from 'src/app/shared/services/socket.service';
import {USER_ONLINE_STATES} from 'src/app/shared/shared/constants';
import {UserService} from '../shared/user-service';

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html"
})
export class UserListComponent implements OnInit {
  constructor(private userSerivce: UserService,
              private router: Router,
              private socketService: SocketService) {
  }

  getUserData = this.userSerivce.getUserData.bind(this.userSerivce);
  @ViewChild(APITable) apiTable: APITable;

  ngOnInit() {
    this.socketService.getUserStatus()
      .subscribe(({userId, state}) => {
        const allRows = this.apiTable.gridAPI.getRenderedNodes();
        const selectedRow = allRows.find((record) => record.data._id === userId);
        if (selectedRow) {
          selectedRow.setDataValue('onlineState', state);
        }
      })
  }

  gotoEditUser(cellClickEvent) {
    const userId = cellClickEvent.data._id;
    this.router.navigateByUrl(`/users/${userId}/edit`);
  }

  async deleteUser(cellClickEvent) {
    const userId = cellClickEvent.data._id;
    try {
      await this.userSerivce.deleteUser(userId);
      this.apiTable.setGridData({fromRefresh: true});
    } catch (e) {
      //do nothing
    }
  }

  columns: Array<ITableColumn> = [
    {field: 'action', isActionColumn: true},
    {field: 'email', flex: 1, minWidth: 200},
    {field: 'firstName'},
    {field: 'lastName'},
    {
      field: 'onlineState', cellRenderer: (event) => {
        let returnValue = 'Offline';
        if (event.data) {
          if (event.data.onlineState === USER_ONLINE_STATES.ONLINE) {
            returnValue = 'Online';
          }
        }
        return `<span class="${returnValue.toLowerCase()}"></span>${returnValue}`;
      }
    }
  ];
}
