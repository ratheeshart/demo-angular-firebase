import { Component, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../core/db.service';
import { Tutorial, Course } from '../core/tutorialCol';
import { AngularFireList } from '@angular/fire/database';
import {
  ModalDismissReasons,
  NgbModal,
  NgbActiveModal,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormArray,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  providers: [{ provide: 'DB', useValue: '/tutorials' }, DbService],
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  tutorials: Array<Tutorial> = null;
  tutorialCol: Array<String> = [];
  title = 'Tutorials';
  public form: Tutorial;
  // @ViewChild('createPopup') createPopup;
  // @ViewChild('tutorialfrom') tutorialfrom: FormGroup;
  tutorialfrom: FormGroup;
  public modal: NgbModalRef;
  constructor(
    private tutorialDB: DbService,
    private popup: NgbModal,
    private formBuilder: FormBuilder,
    private snack: ToastrService
  ) {
    console.log('API: Get all Tutorials');
    this.form = new Tutorial();
  }

  ngOnInit() {
    console.log('Constructing');
    this.getAllTutorials();
    this.tutorialCol = ['Name', 'Description', 'Completed'];
    this.tutorialfrom = new FormGroup({
      name: new FormControl(this.form.name, Validators.required),
      description: new FormControl(this.form.description, Validators.required),
      data: this.formBuilder.array(
        [
          // Validators.required,
          // Validators.minLength(1)
          this.formBuilder.group({
            name: new FormControl('', Validators.required),
            completed: false
          })
        ],
        Validators.minLength(1)
      )
      // 'data.name': new FormControl()
    });
  }
  getAllTutorials() {
    console.log(this.tutorialDB.getAllTutorials());
    const tutorials = this.tutorialDB.getAllTutorials();
    this.tutorials = this.getResult(tutorials);
  }

  getResult(tutorials: AngularFireList<Tutorial>): Array<any> {
    tutorials
    .snapshotChanges()
    .subscribe(v => {
      this.tutorials = [];
        v.forEach(data => {
        console.log(data.payload.key, this.tutorials);
        this.tutorials.push({ key: data.payload.key, ...data.payload.val() });
        });
      }); // { key: v.payload.key, ...v.payload.val() }
    return this.tutorials;
  }
  getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      return 'Create Tutorial Canceled.';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'Focus required';
    } else {
      return `with: ${reason}`;
    }
  }

  showCreatePopup(createPopup) {
    console.log('Create button function here...');
    console.log(createPopup);
    // this.form = new Tutorial();
    this.modal = this.popup.open(createPopup);
    this.modal.result.then(
      reason => {
        console.log(this.getDismissReason(reason));
      },
      reason => {
        console.log(this.getDismissReason(reason));
      }
    );
  }
  removeCourse(data, n) {
    data.splice(n, 1);
  }

  addCourse(data) {
    console.log(data);

    data.push(
      this.formBuilder.group({
        name: new FormControl('', { validators: Validators.required }),
        completed: false
      })
    );
  }

  Save(tutorialfrom, $event) {
    $event.preventDefault();
    console.log(tutorialfrom);
    console.log(tutorialfrom.value, ...tutorialfrom.value);
    const form = tutorialfrom.value;
    console.log(
      (this.form = new Tutorial(
        form.name,
        form.description,
        false,
        0,
        form.data as Array<Course>
      ))
    );
    if (tutorialfrom.status === 'VALID') {
      this.snack.success('Saving.');
      this.tutorialDB.save(this.form)
      .then(
        () => {
          this.snack.success('Data added.');
          this.modal.close('Save click');
        },
        error => {
          this.snack.error('Server not connected.');
          console.log(error);
        }
      );
    } else {
      this.snack.show('All Fields are required.', 'Validation Result');
    }
  }

  UpdateCompleted(tutorial, key: String) {
    console.log(tutorial);

    this.tutorialDB.save(tutorial as Tutorial, tutorial.key);
  }

  clean(tutorial?: String) {
if (tutorial) {
  if (confirm('Delete selected tutorial? key:' + tutorial)) {
  return this.tutorialDB.delete(tutorial).then(() => this.snack.success('Tutorial removed.'));
  }
} else
if (confirm('Clean DB?')) {
  return this.tutorialDB.cleanTutorials().then(() => this.snack.show('DB Cleaned.'));
}
  }
}
