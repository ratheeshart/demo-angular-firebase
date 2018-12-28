import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/core/db.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireObject } from 'angularfire2/database';
import { Tutorial, Course } from 'src/app/core/tutorialCol';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courses',
  providers: [{provide: 'DB' , useValue: '/tutorials'}, DbService],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  tutorial: Tutorial;
  col: Array<string> = ['Name' , 'Materials', ''];

  constructor(private route: ActivatedRoute, private tutorialDB: DbService, private snack: ToastrService) {
  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    this.tutorialDB.getTutorial(key).snapshotChanges().subscribe(v => {
      this.tutorial = {key: v.payload.key , ...v.payload.val()} as Tutorial;
    });
  }

  updateData() {
    const completed: Course[] = this.tutorial.data.filter((f) => f.completed === true);

    const progress = completed ? (completed.length / this.tutorial.data.length ) : 0;
    this.tutorial.progress = progress * 100;
    this.tutorial.completed = completed.length === this.tutorial.data.length;
    this.tutorialDB.save(this.tutorial as Tutorial, this.tutorial.key) .then(
  () => {
    this.snack.success('Synced.');
  },
  error => {
    this.snack.error('Server not connected.');
    console.log(error);
  }
);
  }
}
