import { Injectable, Inject } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  PathReference
} from '@angular/fire/database';
import { Tutorial } from './tutorialCol';
import { Promise } from 'q';

@Injectable()
export class DbService {
  _dbname: PathReference;
  data: AngularFireList<Tutorial>;

  constructor(private db: AngularFireDatabase, @Inject('DB') DB) {
    this._dbname = DB;
  }

  getAllTutorials(): AngularFireList<Tutorial> {
    console.log('Get All ' + this._dbname, this.db.object(this._dbname));
    this.data = this.db.list(this._dbname); // , ref => ref.limitToFirst(10)

    return this.data;
    // return this.getResult();
  }

  save(data, tutorial?: String): Promise<any> {
    console.log(
      `update: ${this._dbname.toString()} \n ${JSON.stringify(data)}`
    );
    return Promise((then, error) => {
      if (tutorial) {
        return this.db
          .object(this._dbname.toString() + '/' + tutorial)
          .update(data)
          .then(then)
          .catch(error)
          .catch(this.handleError);
      }
      return this.data.push(data).then(then, error);
    });
    // .catch(this.handleError);
  }

  delete(tutorial) {
    console.log(`Delete ${this._dbname}/${tutorial}`);
    return this.db
      .object(this._dbname + '/' + tutorial)
      .remove()
      .catch(this.handleError);
  }

  cleanTutorials() {
    return this.data.remove().catch(this.handleError);
  }

  getTutorial(key: String) {
    return this.db.object(this._dbname + `/${key}`);
  }
  handleError(error: Error): any {
    // throw Error;
    console.log(error.message);
  }
}
