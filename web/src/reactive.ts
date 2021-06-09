import { makeVar } from "@apollo/client";

export const recipientVar = makeVar<Nullable<string>>("");

export const themeVar = makeVar<"dark" | "light">(localStorage.getItem("theme") === "light" ? "light" : "dark");

export const drawerOpenVar = makeVar(false);

export const appbarTitleVar = makeVar<React.ReactNode>("Razor Grip Chat");
