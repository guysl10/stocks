import {Component} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {LocalStorageService} from 'src/app/shared/services/localstorage.service';
import {AuthService} from 'src/app/auth/shared/auth.service';

@Component({
  selector: "app-header",
  styleUrls: ["./app-header.component.scss"],
  templateUrl: "./app-header.component.html"
})
export class AppHeaderComponent {
  isLoggingOut: boolean = false;
  menuItems = [
    {title: 'Dashboard', link: '/dashboard', isActive: false},
    {title: 'Products', link: '/products'},
    {title: 'Orders', link: '/orders'},
    {title: 'Users', link: '/users'}
  ];

  constructor(private router: Router, private localStorage: LocalStorageService, private authService: AuthService) {
    router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.menuItems.forEach((item) => {
            item.isActive = event.urlAfterRedirects.indexOf(item.link) > -1
          })
        }
      });
  }

  async logout() {
    if (this.isLoggingOut) {
      return;
    }
    try {
      this.isLoggingOut = true;
      await this.authService.logout();
    } catch (e) {
    } finally {
      this.isLoggingOut = false;
      this.localStorage.remove("accessToken");
      this.localStorage.remove("userInfo");
      this.localStorage.remove("refreshToken");
      this.router.navigate(["/login"]);
    }
  }
}
