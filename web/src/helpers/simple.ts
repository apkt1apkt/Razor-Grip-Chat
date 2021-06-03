import { v1 } from "uuid";

export const getUniqueId = () => v1();

export const setMetaThemeColor = async (color: string, defColor?: string) => {
  await waitFor(20);
  if (defColor) defaultMTC.color = defColor;
  document.querySelector("meta[name=theme-color]")?.setAttribute("content", color || defaultMTC.color);
};

/** Make the setTimeout function asynchronous */
export const waitFor = async (ms: number): Promise<void> => await new Promise((resolve) => setTimeout(resolve, ms));

const defaultMTC = {
  color: "",
};
