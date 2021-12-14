export enum Status {
  Running = "running",
  Finished = "finished",
}

export interface User {
  id: string;
  name: string;
  email: string;
  contactNo?: string;
  department?: string;
  avatarURL?: string;
}

export interface Student {
  id: string;
  userId: string; // userId
  registrationNo: string;
  session: string;
}

export interface Teacher {
  id: string;
  userId: string; // userId
  designation: string;
}

export interface Review {
  id: string;
  userId: string; // user id
  message: string;
}
export interface Course {
  id: string;
  name: string;
  code: string;
  session: string;
  credit: string;
  description: string;
  teachers: Array<string>; // teachers id
}

export interface Project {
  id: string;
  courseId: string; // course id
  title: string;
  summary: string;
  content: string;
  active: boolean;
  team: string; // team id
  updatedAt?: string;
  completionDate?: string;
  reviews?: Array<String>; // reviews id
}

export interface Team {
  id: string;
  name: string;
  members: Array<string>;
}
