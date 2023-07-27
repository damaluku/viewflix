import React from "react";
import { magic } from "@/lib/magic-client";

const test = () => {
  const handler = async () => {
    try {
      const data = await magic.auth.loginWithMagicLink({
        email: "damaluku@gmail.com",
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyUsernameInNav = async () => {
    try {
      // const { email, issuer } = await magic?.user.getMetadata();
      const didToken = await magic?.user.getIdToken();

      console.log({ didToken });
    } catch (error) {
      console.error("Error retrieving email", error);
    }
  };
  return (
    <div>
      <p style={{ marginTop: "5rem" }}>Test Magic Login</p>
      <button onClick={handler}>Test magic</button>
      <button onClick={applyUsernameInNav}>Test Func</button>
    </div>
  );
};

export default test;
