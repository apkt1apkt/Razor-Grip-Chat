import { memo } from "react";
import { useReactiveVar } from "@apollo/client";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import BlockIcon from "@material-ui/icons/Block";
import UnblockIcon from "@material-ui/icons/PersonAdd";

import useBlockUser from "@web/hooks/useBlockUser";
import { recipientVar } from "@web/reactive";

function BlockUserButton() {
  const recipient = useReactiveVar(recipientVar);

  const { getBlockStatus, blockUser, unblockUser } = useBlockUser();

  const blockStatus = getBlockStatus(recipient);

  if (!blockStatus) return <></>;

  const showBlock = blockStatus !== "Blocked";

  const handleClick = () => {
    if (!recipient) return;
    if (showBlock) blockUser({ userId: recipient });
    else unblockUser({ userId: recipient });
  };

  return (
    <Tooltip title="Block this user">
      <IconButton onClick={handleClick}>{showBlock ? <BlockIcon /> : <UnblockIcon />}</IconButton>
    </Tooltip>
  );
}

export default memo(BlockUserButton, () => true);
