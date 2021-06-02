import Drawer, { DrawerProps } from "@web/components/nav/Drawer";
import UsersOnline from "@web/components/UsersOnline";

export default function LeftPane(props: LeftPaneProps) {
  return (
    <Drawer {...props}>
      <UsersOnline />
    </Drawer>
  );
}

type LeftPaneProps = Omit<DrawerProps, "children">;
