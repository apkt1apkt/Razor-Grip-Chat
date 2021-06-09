import cx from "clsx";
import { useReactiveVar } from "@apollo/client";

import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";

import SendIcon from "@material-ui/icons/Send";

import EmojiButton from "@web/components/icon-button/EmojiButton";
import HomeButton from "@web/components/icon-button/HomeButton";
import useChatComposer from "@web/hooks/useChatComposer";
import { bottomPaneHeight, drawerMiniWidth, drawerWidth } from "@web/fixed";
import { drawerOpenVar } from "@web/reactive";

export default function BottomPane() {
  const classes = useStyles();

  const { message, onSendMessage, onTypeMessage, setMessage, weConnect } = useChatComposer();

  const drawerOpen = useReactiveVar(drawerOpenVar);

  const onEmoji = (emoji: string) => setMessage(message + emoji);

  return (
    <div className={cx(classes.bottom, { [classes.bottomShift]: drawerOpen })}>
      <HomeButton className={classes.iconButton} />
      <div className={classes.inputContainer}>
        <form className={classes.form} onSubmit={onSendMessage}>
          <EmojiButton getValue={onEmoji} className={classes.emojiButton} />
          <InputBase
            value={weConnect ? message : ""}
            onChange={onTypeMessage}
            disabled={!weConnect}
            fullWidth
            placeholder={weConnect ? "Type a message" : "Sorry!, you cannot chat this user"}
          />
        </form>
      </div>
      {weConnect && (
        <IconButton onClick={onSendMessage} className={classes.iconButton}>
          <SendIcon />
        </IconButton>
      )}
    </div>
  );
}

const useStyles = makeStyles(({ palette: { background, primary, text }, zIndex, transitions, breakpoints }) => ({
  bottom: {
    bottom: 0,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: background.paper,
    width: "100%",
    padding: 3,
    height: bottomPaneHeight,
    zIndex: zIndex.drawer + 1,
    [breakpoints.up("sm")]: {
      marginLeft: drawerMiniWidth,
      transition: transitions.create(["width", "margin"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
      width: `calc(100% - ${drawerMiniWidth}px)`,
      padding: 10,
    },
  },
  bottomShift: {
    [breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: transitions.create(["width", "margin"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  },
  iconButton: {
    "& .MuiSvgIcon-root": {
      fontSize: 30,
    },
  },
  emojiButton: {
    margin: "0 10px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    color: text.primary,
    backgroundColor: fade(primary.main, 0.1),
    height: 45,
  },
  inputContainer: {
    flexGrow: 1,
    marginRight: -5,
  },
}));
