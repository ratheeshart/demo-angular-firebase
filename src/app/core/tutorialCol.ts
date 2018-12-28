export class Tutorial {
  name: String;
  completed: Boolean;
  progress: Number;
  description: String;
  data: Array<Course> = [];
  key?;
  constructor(
    name?: String,
    description?: String,
    completed?: Boolean,
    progress?: Number,
    data?: Array<Course>
    ) {
      console.log(!data);

      this.data = data || [new Course()];
      this.completed = completed || false;
      this.progress = progress || 10;
        // this.data.push(new Course());
      // }
      this.name = name || '';
      this.description = description || '';
  }
}


export class Course {
  name: String;
  completed: Boolean = false;
  constructor(name?: String, completed: Boolean = false) {

  }
}
