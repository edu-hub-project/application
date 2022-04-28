import { IncomingMessage } from "http";

import { ApolloProvider, useMutation, gql } from "@apollo/client";
import { SSRCookies, SSRKeycloakProvider, useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance, KeycloakTokenParsed } from "keycloak-js";
import cookie from "cookie";
import { appWithTranslation } from "next-i18next";
import type { AppContext, AppProps } from "next/app";
import { FC, useEffect } from "react";
import decode from "jwt-decode";

import { client } from "../config/apollo";

import "../styles/globals.css";

type ParsedToken = KeycloakTokenParsed & {
  email?: string;
  given_name?: string;
  family_name?: string;
};

const keycloakCfg = {
  realm: "edu-hub",
  url: process.env.NEXT_PUBLIC_AUTH_URL,
  clientId: "hasura",
};

interface InitialProps {
  cookies: unknown;
}

const GET_USER = gql`
  query get_User(
    $id: uuid!
  ) {
    User(
      where: { id: { _eq: $id } }
    ) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation update_User(
    $id: uuid!
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    update_User(
      where: { id: { _eq: $id } }
      _set: { email: $email, firstName: $firstName, lastName: $lastName }
    ) {
      affected_rows
    }
  }
`;

const tokenLogger = (tokens: any) => {
  console.log("onKeycloakTokens", tokens);
    // const [updateUser, { data, error }] = useMutation(UPDATE_USER);
    const parsedToken: ParsedToken | undefined = decode(tokens.token);
    console.log(parsedToken);
    const getUserResponse = client.query({
      context: {
        headers: {
          Authorization: "Bearer " + tokens.token,
        },
      },
      query: GET_USER,
      variables: {
        id: parsedToken?.sub
      },
    });

    getUserResponse.then((result) => {
      console.log("queryResult", result);
      if (result.data?.User[0]?.id) {
        const updateUserResponse = client.mutate({
          context: {
            headers: {
              Authorization: "Bearer " + tokens.token,
            },
          },
          mutation: UPDATE_USER,
          variables: {
            id: parsedToken?.sub,
            email: parsedToken?.email,
            firstName: parsedToken?.given_name,
            lastName: parsedToken?.family_name,
          },
        });
        updateUserResponse.then((result) => console.log("updateResult", result));
      } else {
        
      }
    })
    
};

const MyApp: FC<AppProps & InitialProps> & {
  getInitialProps: (ctx: AppContext) => Promise<Record<string, unknown>>;
} = ({ Component, pageProps, cookies }) => {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={SSRCookies(cookies)}
      onTokens={tokenLogger}
    >
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SSRKeycloakProvider>
  );
};

const parseCookies = (req?: IncomingMessage) => {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
};

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req),
  };
};

// @ts-expect-error Typing does not work correctly here because of getInitialProps
export default appWithTranslation(MyApp);
