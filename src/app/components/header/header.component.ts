import { Component, OnInit } from '@angular/core';
import isOnline from 'is-online';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }
  networkStatus: boolean = false;

  ngOnInit(): void {
    (async () => {
      this.networkStatus = await isOnline();
    })();
  }
  logout() {
    this.authService.logout()
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn()
  }

}
