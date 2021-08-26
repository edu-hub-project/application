/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnrollmentStatus_enum, CourseStatus_enum } from "./../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: MyEnrollmentsForCourseQuery
// ====================================================

export interface MyEnrollmentsForCourseQuery_Enrollment_Course_Sessions {
  __typename: "Session";
  Id: number;
  endDateTime: any;
  CourseId: number;
  Description: string;
  Location: string;
  startDateTime: any;
  Name: string;
}

export interface MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors_Instructor_User {
  __typename: "User";
  Firstname: string;
  Image: string | null;
  Id: number;
  Lastname: string;
}

export interface MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors_Instructor {
  __typename: "Instructor";
  Id: number;
  /**
   * An object relationship
   */
  User: MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors_Instructor_User;
  Qualification: string | null;
  Description: string | null;
}

export interface MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors {
  __typename: "CourseInstructor";
  Id: number;
  /**
   * An object relationship
   */
  Instructor: MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors_Instructor;
}

export interface MyEnrollmentsForCourseQuery_Enrollment_Course {
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
  Sessions: MyEnrollmentsForCourseQuery_Enrollment_Course_Sessions[];
  /**
   * An array relationship
   */
  CourseInstructors: MyEnrollmentsForCourseQuery_Enrollment_Course_CourseInstructors[];
}

export interface MyEnrollmentsForCourseQuery_Enrollment {
  __typename: "Enrollment";
  Id: number;
  Status: EnrollmentStatus_enum;
  /**
   * An object relationship
   */
  Course: MyEnrollmentsForCourseQuery_Enrollment_Course;
}

export interface MyEnrollmentsForCourseQuery {
  /**
   * fetch data from the table: "Enrollment"
   */
  Enrollment: MyEnrollmentsForCourseQuery_Enrollment[];
}

export interface MyEnrollmentsForCourseQueryVariables {
  courseId: number;
}
