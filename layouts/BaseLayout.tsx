import React from "react";
import { Cormorant, Roboto_Slab } from "next/font/google";
import NavBar from "@/components/nav/Navbar";
import NavigationBar from "@/components/nav/NavigationBar";

type Props = {
  children: React.ReactNode;
};

// const cormorant = Cormorant({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "vietnamese", "cyrillic"],
});

const BaseLayout = ({ children }: Props) => {
  return (
    <>
      {/* <NavBar /> */}
      <NavigationBar />
      <main className={robotoSlab.className}>{children}</main>
    </>
  );
};

export default BaseLayout;
