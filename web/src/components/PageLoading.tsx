import { makeStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function PageLoading(props: PageLoadingProps) {
  const { loading, firstLoad } = props;
  const classes = useStyles();
  return (
    <>
      {loading && !firstLoad && <LinearProgress style={{ height: 1 }} />}
      {firstLoad && (
        <div className={classes.circular}>
          <CircularProgress size={20} />
        </div>
      )}
    </>
  );
}

type PageLoadingProps = {
  loading?: boolean;
  firstLoad?: boolean;
};

const useStyles = makeStyles({
  circular: {
    display: "grid",
    placeItems: "center",
    marginTop: "25vh",
  },
});
