import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import { CourseWithEnrollment_Course_by_pk } from "../../queries/__generated__/CourseWithEnrollment";
import { BlockTitle } from "../common/BlockTitle";

import { AttendanceEntry } from "./AttendanceEntry";

interface IProps {
  course: CourseWithEnrollment_Course_by_pk;
}

export const Attendances: FC<IProps> = ({ course }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { t } = useTranslation("course-page");

  return (
    <div className="flex flex-col">
      <BlockTitle>{t("attendance")}</BlockTitle>
      <span className="text-lg mb-4">
        {t("MaxMissedSessions", { count: course.maxMissedSessions })}
      </span>
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3">
          {course.Sessions.map((session) => (
            <AttendanceEntry key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};
