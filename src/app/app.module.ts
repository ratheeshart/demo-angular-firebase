import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenubarComponent } from './menubar/menubar.component';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './core/auth.service';
import { TutorialComponent } from './tutorial/tutorial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { CoursesComponent } from './tutorial/courses/courses.component';
import { AuthGuard } from './core/auth.guard';

@NgModule({
  declarations: [AppComponent, MenubarComponent, TutorialComponent, CoursesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // FontAwesomeModule
  ],
  providers: [AngularFireAuth, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
