import { useSession } from "next-auth/react";
import BaseLayout from "./BaseLayout";

type AdminProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminProps) => {
  return children;
};

export default AdminLayout;
