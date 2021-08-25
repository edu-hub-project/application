/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentStatus_enum, CourseStatus_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: InsertEnrollment
// ====================================================

export interface InsertEnrollment_insert_Enrollment_returning_Course_Sessions {
  __typename: "Session";
  Id: number;
  endDateTime: any;
  CourseId: number;
  Description: string;
  Location: string;
  startDateTime: any;
  Name: string;
}

export interface InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors_Instructor_User {
  __typename: "User";
  Firstname: string;
  Image: string | null;
  Id: number;
  Lastname: string;
}

export interface InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors_Instructor {
  __typename: "Instructor";
  Id: number;
  /**
   * An object relationship
   */
  User: InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors_Instructor_User;
  Qualification: string | null;
  Description: string | null;
}

export interface InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors {
  __typename: "CourseInstructor";
  Id: number;
  /**
   * An object relationship
   */
  Instructor: InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors_Instructor;
}

export interface InsertEnrollment_insert_Enrollment_returning_Course_Enrollments {
  __typename: "Enrollment";
  Id: number;
  Status: EnrollmentStatus_enum;
}

export interface InsertEnrollment_insert_Enrollment_returning_Course {
  __typename: "Course";
  Id: number;
  Ects: string;
  Description: string;
  WeekDay: string | null;
  CourseType: number | null;
  Cost: string;
  City: string;
  ApplicationEnd: any;
  Image: string | null;
  Language: string;
  MaxMissedSessions: number;
  MaxParticipants: number;
  Name: string;
  OnlineCourses: string;
  ProgramId: number | null;
  Status: CourseStatus_enum;
  ShortDescription: string;
  TimeStart: any | null;
  TimeEnd: any | null;
  /**
   * An array relationship
   */
  Sessions: InsertEnrollment_insert_Enrollment_returning_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: InsertEnrollment_insert_Enrollment_returning_Course_CourseInstructors[];
  /**
   * An array relationship
   */
  Enrollments: InsertEnrollment_insert_Enrollment_returning_Course_Enrollments[];
}

export interface InsertEnrollment_insert_Enrollment_returning {
  __typename: "Enrollment";
  Id: number;
  Status: EnrollmentStatus_enum;
  /**
   * An object relationship
   */
  Course: InsertEnrollment_insert_Enrollment_returning_Course;
}

export interface InsertEnrollment_insert_Enrollment {
  __typename: "Enrollment_mutation_response";
  /**
   * number of rows affected by the mutation
   */
  affected_rows: number;
  /**
   * data from the rows affected by the mutation
   */
  returning: InsertEnrollment_insert_Enrollment_returning[];
}

export interface InsertEnrollment {
  /**
   * insert data into the table: "Enrollment"
   */
  insert_Enrollment: InsertEnrollment_insert_Enrollment | null;
}

export interface InsertEnrollmentVariables {
  userId: number;
  courseId: number;
  motivationLetter: string;
}
