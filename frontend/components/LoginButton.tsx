import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { gql, useMutation } from '@apollo/client';
import { Button } from "./common/Button";
type ParsedToken = KeycloakTokenParsed & {
  email?: string
  first_name?: string
  last_name?: string
}

export const useLogin = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const router = useRouter();
  const performLogin = useCallback(() => {
    const url = keycloak?.createLoginUrl({
      redirectUri: window.location.href + "?from_keycloak=true",
    });
    if (!url) return;
    
    router.push(new URL(url));
  }, [keycloak, router]);
  
  return performLogin;
};
export const LoginButton: FC = () => {
  const { t } = useTranslation();
  const performLogin = useLogin();
  return <Button onClick={performLogin}>{t("loginButton.title")}</Button>;
};
