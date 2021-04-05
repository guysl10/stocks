import {Injectable, EventEmitter} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) {
  }

  socketEventListener = new EventEmitter();

  getUserStatus() {
    return this.socket.fromEvent("user-status")
      .pipe(map((data) => data));
  }
}
