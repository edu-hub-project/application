import { gql } from "@apollo/client";

import { COURSE_FRAGMENT } from "./courseFragment";
import { ENROLLMENT_FRAGMENT } from "./enrollmentFragment";
import { PROGRAM_FRAGMENT } from "./programFragment";

export const MY_COURSES = gql`
  ${COURSE_FRAGMENT}
  ${ENROLLMENT_FRAGMENT}
  ${PROGRAM_FRAGMENT}
  query MyCourses($authId: uuid!) {
    User_by_pk(id: $authId) {
      CourseEnrollments {
        ...EnrollmentFragment
        Course {
          ...CourseFragment
          CourseEnrollments {
            ...EnrollmentFragment
          }
          Program {
            ...ProgramFragment
          }
        }
      }
    }
  }
`;
