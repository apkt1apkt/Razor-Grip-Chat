import { useAuth0 } from "@auth0/auth0-react";

export default function useUser() {
  const { user } = useAuth0();
  return {
    _id: user?.sub,
    picture: user?.picture,
    email: user?.email,
    fullName: user?.name,
  };
}
