import { memo } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import BlockIcon from "@material-ui/icons/Block";
import UnblockIcon from "@material-ui/icons/PersonAdd";

import useBlockButton from "@web/hooks/useBlockButton";

function BlockUserButton() {
  const data = useBlockButton();

  if (!data) return <></>;

  const { onBlockUnblock, showBlock, action } = data;

  return (
    <Tooltip title={`${action} this user`}>
      <IconButton onClick={onBlockUnblock}>{showBlock ? <BlockIcon /> : <UnblockIcon />}</IconButton>
    </Tooltip>
  );
}

export default memo(BlockUserButton, () => true);
