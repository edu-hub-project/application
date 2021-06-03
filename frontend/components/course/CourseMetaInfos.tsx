import Image from "next/image";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Course_Course_by_pk } from "../../queries/__generated__/Course";

import { CourseCost } from "./CourseCost";
import { CourseWeekday } from "./CourseWeekday";

interface IProps {
  course: Course_Course_by_pk;
}

export const CourseMetaInfos: FC<IProps> = ({ course }) => {
  const { t, i18n } = useTranslation();

  const startTime = course.TimeOfStart.toLocaleTimeString(i18n.languages, {
    hour: "numeric",
    minute: "numeric",
  });
  const endTime = course.Duration
    ? new Date(
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        course.TimeOfStart.getTime() + course.Duration * 60000
      ).toLocaleTimeString(i18n.languages, {
        hour: "numeric",
        minute: "numeric",
      })
    : "";

  console.log("lang", course.Language);

  return (
    <div className="flex flex-1 flex-col justify-center items-center mx-6 lg:max-w-md bg-gray-100 p-12 sm:p-24">
      <div className="grid grid-cols-3 gap-x-8">
        <div className="flex justify-center">
          <Image
            src="/images/course/difficulty-easy.svg"
            alt="Difficulty"
            width={35}
            height={26}
          />
        </div>
        <span className="text-lg mt-2 text-center">
          <CourseWeekday course={course} short uppercased />
        </span>
        <span className="text-lg mt-2 text-center">
          {(course.Duration ?? 0) / 60}
        </span>
        <span className="text-sm mt-2 text-center mb-12">
          {course.Difficulty}
        </span>
        <span className="text-sm mt-2 text-center mb-12">
          {startTime} - {endTime}
        </span>
        <span className="text-sm mt-2 text-center mb-12"> h/Woche</span>
        <div className="flex justify-center">
          <Image
            src="https://picsum.photos/36/36"
            alt="Difficulty"
            width={36}
            height={36}
            className="rounded-full overflow-hidden"
          />
        </div>
        <span className="text-lg mt-2 text-center">{course.Ects}</span>
        <div className="flex justify-center">
          <Image
            src="https://picsum.photos/36/36"
            alt="Difficulty"
            width={36}
            height={36}
            className="rounded-full overflow-hidden"
          />
        </div>
        <span className="text-sm mt-2 text-center">
          {"Wo zur Hölle? Online?"}
        </span>
        <span className="text-sm mt-2 text-center">ECTS</span>
        <span className="text-sm mt-2 text-center">
          {course.Language || "Pantomimisch"}
        </span>
      </div>
      <span className="my-12 sm:my-24">
        <CourseCost course={course} />
      </span>
      <div className="flex">
        <div className="flex flex-shrink-0 items-start mr-4">
          <Image
            src="https://picsum.photos/68/68"
            alt="Difficulty"
            width={68}
            height={68}
            className="rounded-full overflow-hidden"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-base mb-1">Kursleiter</span>
          <span className="text-xs uppercase mb-4">Qualifikation oder so</span>
          <span className="text-sm">
            Hier steht eine Beschreibung über den Kursleiter in eine kurzen Satz
            oder so. Das kann auch noch mehr Text sein...
          </span>
        </div>
      </div>
    </div>
  );
};