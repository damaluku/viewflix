import { verifyToken } from "@/lib/utils";

const UseRedirectUser = async (context: any) => {
  const token = context.req ? context.req.cookies.token : null;
  const userId: any = await verifyToken(token);

  return {
    userId,
    token,
  };
};

export default UseRedirectUser;
