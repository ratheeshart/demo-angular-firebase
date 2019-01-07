import { getNextStudentNo } from "./AutoCounter";
import * as admin from "firebase-admin";
import { Promise } from "q";

const _db_name = "/students";

export class Student {
  // private key?: String;
  student_no: Number;
  student_name: String;
  doj: Date;
  class_name: String;

  constructor(student_name?: String, doj?: Date, class_name?: String) {
    this.student_name = student_name;
    this.doj = doj;
    this.class_name = class_name;
  }

  validate(): boolean {
    return this.class_name && this.doj && this.student_name ? true : false;
  }
}
// let vvv = [];
// console.log(new Student(...vvv));

export const createStudentData = (
  studentData: Student
): Promise<Student | Error> => {
  return Promise((resolve, cancel) => {
    if (studentData.validate()) {
      getNextStudentNo().then(student_no => {
        studentData.student_no = student_no;
        admin
          .database()
          .ref(_db_name)
          .push(studentData)
          .then(data => {
            console.log(data);
            resolve(data as Student);
          });
      },cancel);
    } else {
      cancel(new Error("All fields are required."));
    }
  });
};

export const getAllStudents = (): Promise<Array<Student>> => {
  return Promise((resolve, cancel) => {
    admin
      .database()
      .ref(_db_name)
      .once("value", data => {
        if (data.exists()) {
          const arr_students = [];
          data.forEach(v => {
            arr_students.push({ key: v.key, ...v.val() });
            return true;
          });
          resolve(arr_students);
        }
        resolve([]);
      }, cancel);
  });
};
