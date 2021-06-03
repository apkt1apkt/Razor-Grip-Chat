import cx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

export default function ChatMessage(props: ChatMessageProps) {
  const { message, date, mine } = props;
  const classes = useStyles();
  return (
    <div className={cx(classes.root, { [classes.myMessage]: !!mine })}>
      <div className={classes.messageContent}>
        <div className={classes.messageItem}>{message} </div>
        {date && (
          <Tooltip title={date.toDateString()}>
            <sub className={classes.dateItem}>
              {date.getHours()}:{date.getMinutes()}
            </sub>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    padding: "10px 20px",
    borderRadius: 25,
    maxWidth: "85%",
    width: "fit-content",
    position: "relative",
    margin: "5px 0",
    wordBreak: "break-all",
    transform: "rotate(180deg)",
    direction: "ltr",
    background: "linear-gradient(to right, rgba(31, 97, 141, 0.9), rgba(27, 79, 114 , 0.2))",
    color: "white",
  },
  myMessage: {
    marginLeft: "auto",
  },
  messageContent: {
    display: "grid",
    gridTemplateColumns: "auto 40px",
    placeItems: "flex-end",
  },
  messageItem: {
    marginRight: -10,
  },
  dateItem: {
    fontSize: 10,
    marginRight: -10,
  },
});

type ChatMessageProps = {
  message: string;
  date?: Date;
  mine: boolean;
};
