import * as admin from "firebase-admin";
export default class AutoCounter {
  student_db_n: number = 0;
}
const _db_name = "/autocount";

import { Promise } from "q";
import { environment } from "../../environments/environment";

admin.initializeApp(environment.firebaseConfig);
const defaultData = new AutoCounter();
export const getNextStudentNo = (): Promise<Number> => {
  return Promise((resolve, cancel) => {
    admin
      .database()
      .ref(_db_name)
      .limitToLast(1)
      .once(
        "value",
        data => {
          const last_added_no = data.val() as AutoCounter;
          if (last_added_no) {
            last_added_no.student_db_n++;
            admin
              .database()
              .ref(_db_name)
              .set(last_added_no)
              .then(() => {
                resolve(last_added_no.student_db_n);
              })
              .catch(error => cancel(error));
          } else {
            admin
              .database()
              .ref(_db_name)
              .push(defaultData)
              .then(() => {
                resolve(defaultData.student_db_n);
              });
          }
        },
        error => cancel(error)
      )
      .catch(error => cancel(error));
  });
};

export const getAllAutoCount = () => admin
.database()
.ref(_db_name).once("value");