import cx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/OutlinedInput";
import { makeStyles, fade } from "@material-ui/core/styles";

import EmojiIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";

import { drawerMiniWidth, drawerWidth } from "@web/fixed";

export default function BottomPane(props: BottomPaneProps) {
  const { drawerOpen } = props;
  const classes = useStyles();
  return (
    <div className={cx(classes.bottom, { [classes.bottomShift]: drawerOpen })}>
      <IconButton className={classes.iconButton}>
        <EmojiIcon className={classes.icon} />
      </IconButton>
      <div className={classes.inputContainer}>
        <Input fullWidth margin="dense" placeholder="Type a message" />
      </div>
      <IconButton className={classes.iconButton}>
        <SendIcon className={classes.icon} />
      </IconButton>
    </div>
  );
}

type BottomPaneProps = {
  drawerOpen: boolean;
};

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
    color: "inherit",
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
