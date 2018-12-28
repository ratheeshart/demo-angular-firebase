import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  isNavbarCollapsed = true;
  title = 'Demo Application';

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  loginWithGoogle() {
    console.log('auth worked ;)');
    this.auth.signInWithGoogle();
  }

  logout() {
    this.auth.logout();
  }
}
