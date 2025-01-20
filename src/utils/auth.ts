import { getSession, isValid, destroySession } from "@/utils/Session";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

// Higher-order function
export function withSessionProtection<P extends { [key: string]: any }>(
  handler: (
    context: GetServerSidePropsContext & {
      session?: ReturnType<typeof getSession>;
    }
  ) => ReturnType<GetServerSideProps<P>>
): GetServerSideProps<P> {
  return async (context: GetServerSidePropsContext) => {
    const session = getSession(context.req);

    // If session is invalid or not found, redirect to login
    if (!session || !isValid(session)) {
      const redirectResult = {
        redirect: {
          destination: "/authorise",
          permanent: false,
        },
        props: {},
      };

      // Set cookie headers for session destruction (do not return headers directly)
      context.res.setHeader("Set-Cookie", destroySession());

      return redirectResult;
    }

    // If session is valid, pass the session to the handler
    return handler({
      ...context,
      session,
    });
  };
}
