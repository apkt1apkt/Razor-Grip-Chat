import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

import useMenu, { MenuOptions } from "@web/hooks/useMenu";

export default function IconTriggerMenu(props: IconTriggerMenuProps) {
  const { children, ButtonProps, ...rest } = props;
  const { menuId, menuNode, anchorRef, handleOpen } = useMenu(rest);

  return (
    <>
      <IconButton
        {...ButtonProps}
        ref={anchorRef}
        aria-controls={menuId}
        aria-haspopup="true"
        edge="end"
        onClick={handleOpen}
      >
        {children}
      </IconButton>
      {menuNode}
    </>
  );
}

IconTriggerMenu.defaultProps = {
  placement: "bottom",
};

export type IconTriggerMenuProps = {
  children: React.ReactNode;
  ButtonProps?: Omit<IconButtonProps, "aria-controls" | "aria-haspopup" | "onClick" | "ref">;
} & MenuOptions;
