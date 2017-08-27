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
  basePath: string;
}

export interface Instructor extends Person {
  email: string;
}

export interface Student extends Person {
  id?: number;
}

export interface Course extends Entity {
  location: Location;
  instructors: Instructor[];
  students: Student[];
  sessions: Session[];
  projects: Project[];
}

export interface Session {
  date: string;
  holiday?: string;
  location?: Location;
}

export interface Location extends Entity {
  building: string;
  room: string;
}

export interface Project extends Entity {
  description?: string;
  instructions?: string;
  deliverables?: Deliverable[];
  references?: Reference[];
}

export interface Deliverable extends Entity {
  projectSlug?: string;
  assigned: string;
  due: string;
  file: string;
  description?: string;
  instructions?: string;
  references?: Reference[];
}

export interface Reference {
  name: string;
  link: string;
  description?: string;
}

export interface DeliverableSet {
  deliverable: Deliverable;
  personLinks: PersonLink[];
}

export interface PersonLink {
  person: Person;
  found: boolean;
  file?: string;
  deliverableConfig?: DeliverableConfig;
}

export interface DeliverableConfig {
  entrypoints?: Entrypoint[];
}

export interface Entrypoint {
  name: string;
  file: string;
}
