import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AppHeaderComponent} from "./app-header/app-header.component";
import {LayoutComponent} from "./layout.component";
import {AppFooterComponent} from "./app-footer/app-footer.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AppHeaderComponent, AppFooterComponent, LayoutComponent]
})
export class LayoutModule {
}
