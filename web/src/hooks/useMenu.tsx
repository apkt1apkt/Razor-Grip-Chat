import { useState, useRef, useEffect } from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper, { PopperProps } from "@material-ui/core/Popper";

import useId from "@web/hooks/useId";
import { ToMenu, ToMenuProps } from "@web/helpers/menu";

export default function useMenu(options: MenuOptions) {
  const { menus, placement } = options;
  const id = useId(options.id);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleClose = ({ target }: any) => {
    if (anchorRef.current && anchorRef.current.contains(target)) return;
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) anchorRef.current!.focus();
    prevOpen.current = open;
  }, [open]);

  const menuNode = (
    <Popper
      style={{ zIndex: 99 }}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      placement={placement}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id={id} onKeyDown={handleListKeyDown}>
                {menus.map((v, i) => (
                  <ToMenu
                    key={i}
                    {...v}
                    onClick={(e) => {
                      if (!v.keepOpenOnClick) handleClose(e);
                      if (v.onClick) v.onClick(e);
                    }}
                  />
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return { menuNode, menuId: id, handleClose, handleOpen: () => setOpen(true), anchorRef };
}

export type MenuOptions = {
  menus: (ToMenuProps & { keepOpenOnClick?: boolean })[];
  id?: string;
  placement?: PopperProps["placement"];
};
