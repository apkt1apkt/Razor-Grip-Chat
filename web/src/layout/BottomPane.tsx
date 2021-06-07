import cx from "clsx";
import { useReactiveVar } from "@apollo/client";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/OutlinedInput";
import { makeStyles, fade } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";

import useChatComposer from "@web/hooks/useChatComposer";
import { drawerMiniWidth, drawerWidth } from "@web/fixed";
import { drawerOpenVar, recipientVar } from "@web/reactive";

export default function BottomPane() {
  const classes = useStyles();

  const { message, onSendMessage, onTypeMessage, weConnect } = useChatComposer();

  const drawerOpen = useReactiveVar(drawerOpenVar);

  const goHome = () => recipientVar("");

  return (
    <div className={cx(classes.bottom, { [classes.bottomShift]: drawerOpen })}>
      <IconButton className={classes.iconButton} color="primary" onClick={goHome}>
        <HomeIcon className={classes.icon} />
      </IconButton>
      <div className={classes.inputContainer}>
        <form onSubmit={onSendMessage}>
          <Input
            value={weConnect ? message : ""}
            onChange={onTypeMessage}
            disabled={!weConnect}
            fullWidth
            margin="dense"
            placeholder={weConnect ? "Type a message" : "Sorry!, you cannot chat this user"}
          />
        </form>
      </div>
      {weConnect && (
        <IconButton onClick={onSendMessage} className={classes.iconButton}>
          <SendIcon className={classes.icon} />
        </IconButton>
      )}
    </div>
  );
}

const useStyles = makeStyles(({ palette: { background, primary, text }, zIndex, transitions }) => ({
  bottom: {
    bottom: 0,
    position: "fixed",
    padding: 10,
    width: `calc(100% - ${drawerMiniWidth}px)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    backgroundColor: background.paper,
    zIndex: zIndex.drawer + 1,
    marginLeft: drawerMiniWidth,
  },
  bottomShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  },
  icon: {
    fontSize: 30,
  },
  iconButton: {
    marginRight: 10,
  },
  inputContainer: {
    flexGrow: 1,
    marginLeft: -10,
    "& .MuiOutlinedInput-root": {
      borderRadius: 100,
      "& input": {
        color: text.primary,
        paddingLeft: 20,
      },
      "& fieldset": {
        borderColor: "transparent",
        backgroundColor: fade(primary.main, 0.1),
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent",
      },
    },
  },
}));
