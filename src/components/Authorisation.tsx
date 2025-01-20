import React, { FC, ReactNode, useState } from "react";

interface AuthorisationProps {
  children: ReactNode;
}

const Authorisation: FC<AuthorisationProps> = ({ children }) => {
  return (
    <div>{children}</div>
  );
};

export default Authorisation;
