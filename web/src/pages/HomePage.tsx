import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Page from "@web/components/Page";

export default function HomePage() {
  const history = useHistory();
  const classes = useStyles();
  const goTo = (name: "recent" | "blocked") => () => history.push("/" + name);
  return (
    <Page title="Razor Grip Chat">
      <div className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={goTo("recent")}
            className={classes.recentButton}
          >
            Recent Chats
          </Button>
          <Button variant="contained" color="primary" size="large" onClick={goTo("blocked")}>
            Blocked Users
          </Button>
        </div>
      </div>
    </Page>
  );
}

const useStyles = makeStyles({
  container: {
    display: "grid",
    placeItems: "center",
    placeContent: "center",
    height: "70vh",
  },
  buttonContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-around",
  },
  recentButton: {
    marginRight: 10,
  },
});
