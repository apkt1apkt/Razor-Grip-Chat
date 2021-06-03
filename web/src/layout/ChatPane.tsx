import { makeStyles } from "@material-ui/core/styles";

export default function ChatPane(props: ChatPaneProps) {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.chatContainer}>
      <div className={classes.chat}>{children}</div>
    </div>
  );
}

const useStyles = makeStyles({
  chatContainer: {
    padding: "15px 30px",
    height: "100%",
    margin: "0 auto",
    overflowY: "auto",
    backgroundColor: "inherit",
    transform: "rotate(180deg)",
    direction: "rtl",
  },
  chat: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
  },
});

type ChatPaneProps = {
  children: React.ReactNode;
};
