import React from "react";
import TopPage from "src/containers/TopPage";
import LoginPage, { LoginWorkspacePage, ResetPasswordPage } from "src/containers/LoginPage";
import SignUpPage from "src/containers/SignUpPage";

type Page = {
  path: string;
  View: React.FC;
  noPadding?: boolean;
};

const pages: Page[] = [
  {
    path: "/",
    View: TopPage,
    noPadding: true,
  },
  {
    path: "/signup/:workspaceId",
    View: SignUpPage,
  },
  {
    path: "/login",
    View: LoginPage,
  },
  {
    path: "/login/:workspaceId",
    View: LoginWorkspacePage,
  },
  {
    path: "/reset_password",
    View: ResetPasswordPage,
  },
];
export default pages;
