import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {LayoutModule} from "./layout/layout.module";
import {HttpClientModule} from '@angular/common/http';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const config: SocketIoConfig = {url: 'http://localhost:9001', options: {}};

@NgModule({
  imports: [
    BrowserModule, AppRoutingModule, LayoutModule, HttpClientModule,
    SocketIoModule.forRoot(config),
    NgbModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
