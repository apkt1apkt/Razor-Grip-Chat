import { memo, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

function UpdateUserInfo() {
  const { user, isAuthenticated } = useAuth0();

  const [doUpdateMe] = useMutation(UPDATE_ME);

  useEffect(() => {
    if (isAuthenticated) {
      const { email, name, picture } = user || {};
      doUpdateMe({ variables: { body: { email, name, img: picture } } }).catch((e) => e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <></>;
}

const UPDATE_ME = gql`
  mutation UpdateMe($body: UserInput!) {
    updateMe(body: $body) {
      _id
      email
      name
      img
    }
  }
`;

export default memo(UpdateUserInfo, () => true);
