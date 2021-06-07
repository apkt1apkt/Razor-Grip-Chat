import { useReactiveVar } from "@apollo/client";
import { memo } from "react";

import List from "@material-ui/core/List";

import UserListItem from "@web/components/UserListItem";
import useUsersOnline from "@web/hooks/useUsersOnline";
import { recipientVar } from "@web/reactive";

function UsersOnline() {
  const usersOnline = useUsersOnline();

  const recipient = useReactiveVar(recipientVar);

  const onSelectRecipient = (selectedId?: Nullable<string>) => () => {
    if (recipient !== selectedId) recipientVar(selectedId);
    else recipientVar("");
  };

  if (usersOnline.length < 1) return <></>;

  return (
    <List>
      {usersOnline.map((v) => {
        if (!v?.weConnect) return "";
        return <UserListItem key={v?._id} {...v} isOnline onClick={onSelectRecipient(v?._id)} />;
      })}
    </List>
  );
}

export default memo(UsersOnline);
