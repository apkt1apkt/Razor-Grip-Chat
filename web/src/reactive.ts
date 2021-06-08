import { makeVar } from "@apollo/client";

export const recipientVar = makeVar<Nullable<string>>("");

export const themeVar = makeVar<"dark" | "light">("dark");

export const drawerOpenVar = makeVar(true);

export const appbarTitleVar = makeVar<React.ReactNode>("Razor Grip Chat");
