import { tryParse } from "./simple";

export const explainErr = (error: Error, errorRegardless = true): { message: string; code?: string } | null => {
  const doExplanation = () => {
    const err = tryParse(JSON.stringify(error));
    if (!err) return;
    if (err.message) {
      if (err.message === "Network error: Failed to fetch")
        return { message: "Please check internet connection", code: "NE" };
      if (err.message.startsWith("Network error")) return { message: "An error occurred", code: "NE" };
    }
    if (err.graphQLErrors) {
      const gqlErr = err.graphQLErrors[0];
      if (!gqlErr) return { message: "Error" };
      return {
        message: gqlErr.message,
        code: gqlErr.extensions?.code,
      };
    }
  };
  const err = doExplanation();
  return err ? err : errorRegardless ? { message: "An error occurred" } : null;
};
