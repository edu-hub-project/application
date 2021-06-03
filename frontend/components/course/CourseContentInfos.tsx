import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Course_Course_by_pk } from "../../queries/__generated__/Course";

interface IProps {
  course: Course_Course_by_pk;
}

export const CourseContentInfos: FC<IProps> = ({ course }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-1 flex-col mx-6 sm:mr-12 mb-8 sm:mb-24">
      <span className="text-3xl font-semibold mt-24 mb-9">Du wirst lernen</span>
      {/* <ul>
        {learnings.map((learning, index) => (
          <li key={index} className="check-list mb-4">
            <span className="block text-sm sm:text-lg">{learning}</span>
          </li>
        ))}
      </ul> */}
      <div dangerouslySetInnerHTML={{ __html: course.Description }} />
      <span className="text-3xl font-semibold mt-24 mb-9">Kursinhalte</span>
      <ul>
        {course.Sessions.map(({ Start, Description }, index) => (
          <li key={index} className="flex mb-4">
            <div className="flex flex-col flex-shrink-0 mr-6">
              <span className="text-xs sm:text-sm font-semibold">
                {Start.toLocaleDateString(i18n.languages, {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
              <span className="text-xs sm:text-sm">
                {Start.toLocaleTimeString(i18n.languages, {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </div>
            <span className="block text-sm sm:text-lg">{Description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};