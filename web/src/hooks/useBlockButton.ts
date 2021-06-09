import { useReactiveVar } from "@apollo/client";
import { recipientVar } from "@web/reactive";
import useBlockUser from "./useBlockUser";

export default function useBlockButton() {
  const recipient = useReactiveVar(recipientVar);

  const { getBlockStatus, onBlockUser, onUnblockUser } = useBlockUser();

  const blockStatus = getBlockStatus(recipient);

  if (!blockStatus) return null;

  const showBlock = blockStatus !== "Blocked";

  const onBlockUnblock = () => {
    if (!recipient) return;
    if (showBlock) onBlockUser({ userId: recipient })();
    else onUnblockUser({ userId: recipient })();
  };

  return {
    onBlockUnblock,
    showBlock,
    action: showBlock ? "Block" : "Unblock",
  };
}
