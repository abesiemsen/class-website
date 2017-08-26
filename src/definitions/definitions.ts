export interface Configuration {
  course: Course;
}

export interface Entity {
  slug: string;
  name: string;
}

export interface Person {
  slug: string;
  firstName: string;
  lastName: string;
}

export interface Instructor extends Person {
  basePath: string;
  email: string;
}

export interface Student extends Person {
  basePath: string;
}

export interface Course extends Entity {
  location: Location;
  instructors: Instructor[];
  students: Student[];
  sessions: Session[];
  exercises: Exercise[];
  projects: Project[];
}

export interface Session {
  date: string;
  location?: Location;
}

export interface Location extends Entity {
  building: string;
  room: string;
}

export interface Assignment extends Entity {
  description?: string;
  instructions?: string;
}

export interface Exercise extends Assignment {
  deliverable: Deliverable;
}

export interface Project extends Assignment {
  deliverables?: Deliverable[];
}

export interface Deliverable extends Entity {
  assigned: string;
  due: string;
  file: string;
  description?: string;
  instructions?: string;
}
