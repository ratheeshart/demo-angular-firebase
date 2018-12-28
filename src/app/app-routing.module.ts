import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { CoursesComponent } from './tutorial/courses/courses.component';
import { AuthGuard } from './core/auth.guard';
import { AppComponent } from './app.component';
const routes: Routes = [{path: 'tutorials', component: TutorialComponent , canActivate: [AuthGuard],
// children: [{ path: 'tutorial/:key', component: CoursesComponent , outlet: ''}]
},
{ path: 'tutorial/:key', component: CoursesComponent , canActivate: [AuthGuard]},
// { path: '', component: AppComponent },
{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
