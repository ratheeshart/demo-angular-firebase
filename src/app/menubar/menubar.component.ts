import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  isNavbarCollapsed = true;
  title = 'Demo Application';

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}

  loginWithGoogle() {
    console.log('auth worked ;)');
    this.auth.signInWithGoogle();
  }

  logout() {
    this.auth.logout().finally(() => this.route.navigate(['/']));
  }
}
