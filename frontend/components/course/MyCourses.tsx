import { useQuery } from "@apollo/client";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { FC } from "react";

import { useAuthedQuery } from "../../hooks/authedQuery";
import { useIsLoggedIn } from "../../hooks/authentication";
import { PARTICIPATING } from "../../queries/participating";

import { TileSlider } from "./TileSlider";

interface IProps {}

export const MyCourses: FC<IProps> = () => {
  const { data, loading, error } = useAuthedQuery(PARTICIPATING, {
    variables: { id: 12 },
  });

  console.log("d", data, error);

  const enrollments = data?.Person_by_pk?.Participants?.[0]?.Enrollments;
  const courses = enrollments?.map((enrollment) => enrollment.Course) ?? [];
  console.log("c", courses);

  if ((courses.length ?? 0) <= 0) return null;

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mt-20">Deine Kurse</h2>
      <div className="mt-11">
        <TileSlider courses={courses ?? []} />
      </div>
    </>
  );
};