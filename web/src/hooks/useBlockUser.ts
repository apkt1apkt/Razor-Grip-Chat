import { gql, useMutation } from "@apollo/client";

import useMe from "@web/hooks/useMe";
import { userPayload } from "@web/payload";
import { confirmMutateSwal } from "@web/helpers/swal";

export default function useBlockUser() {
  const { isLoading, blockedByMe } = useMe();

  const [doBlockUser] = useMutation(BLOCK_USER);
  const [doUnblockUser] = useMutation(UNBLOCK_USER);

  const onBlockUser =
    ({ userId, name }: Opt) =>
    () => {
      confirmMutateSwal({
        confirmText: `Are you sure you want to block this user`,
        confirmIcon: "warning",
        confirmButtons: ["Cancel", "Yes, block!"],
        confirmTitle: name || "",
        isDangerous: true,
        func: () => doBlockUser({ variables: { userId } }),
      });
    };

  const onUnblockUser =
    ({ userId, name }: Opt) =>
    () => {
      confirmMutateSwal({
        confirmText: `Are you sure you want to unblock this user`,
        confirmIcon: "warning",
        confirmButtons: ["Cancel", "Yes, unblock!"],
        confirmTitle: name || "",
        func: () => doUnblockUser({ variables: { userId } }),
      });
    };

  const getBlockStatus = (userId: Nullable<string>) => {
    if (!userId || isLoading) return;
    return blockedByMe?.includes(userId) ? "Blocked" : "Not Blocked";
  };

  return { onBlockUser, onUnblockUser, getBlockStatus };
}

const payload = `blockedByMe ${userPayload}`;

type Opt = { userId: string; name?: Nullable<string> };

const BLOCK_USER = gql`
  mutation BlockUser($userId: String!) {
    blockUser(userId: $userId){
        ${payload}
    }
  }
`;

const UNBLOCK_USER = gql`
  mutation Unblockuser($userId: String!) {
    unblockUser(userId: $userId){
        ${payload}
    }
  }
`;
