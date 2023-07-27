import { useSession } from "next-auth/react";
import BaseLayout from "./BaseLayout";

type AdminProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminProps) => {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};

export default AdminLayout;
