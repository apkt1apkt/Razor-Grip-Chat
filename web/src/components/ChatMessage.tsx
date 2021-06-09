import cx from "clsx";

import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import ClockIcon from "@material-ui/icons/QueryBuilder";

export default function ChatMessage(props: ChatMessageProps) {
  const { message, isMine, _isOptimistic } = props;
  const createdAt = props.createdAt ? new Date(props.createdAt) : null;
  const classes = useStyles();
  if (!message) return <></>;
  return (
    <div>
      <div className={cx(classes.root, { [classes.myMessage]: isMine })}>
        <div className={classes.messageContent}>
          <div className={classes.messageItem}>{message} </div>
          {createdAt && (
            <Tooltip title={createdAt.toDateString()}>
              <div className={classes.dateItem}>
                <div>
                  {createdAt.getHours()}:{createdAt.getMinutes()}
                </div>
                {_isOptimistic && (
                  <div>
                    <ClockIcon className={classes.icon} />
                  </div>
                )}
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles(({ palette: { background, type, primary } }) => ({
  root: {
    padding: "10px 20px",
    borderRadius: 25,
    maxWidth: "85%",
    width: "fit-content",
    position: "relative",
    margin: "5px 0",
    wordBreak: "break-all",
    background: type === "light" ? background.paper : `linear-gradient(to right, ${primary.main}, ${primary.dark})`,
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
    display: "flex",
    fontSize: 10,
    marginRight: -10,
  },
  icon: {
    fontSize: 12,
    paddingTop: 2,
    paddingLeft: 2,
  },
}));

type ChatMessageProps = Data.O<{
  message: string;
  createdAt: Date;
  isMine: boolean;
  _isOptimistic: boolean;
}>;
