import { makeStyles } from "@material-ui/core/styles";

import Appbar, { AppbarProps } from "@web/components/nav/Appbar";

export default function MainPane(props: MainPaneProps) {
  const { children, ...appbarProps } = props;
  const classes = useStyles();
  return (
    <>
      <Appbar {...appbarProps} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </>
  );
}

type MainPaneProps = {
  children: React.ReactNode;
} & AppbarProps;

const useStyles = makeStyles(({ spacing, mixins }) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: spacing(0, 1),
    ...mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: spacing(3),
  },
}));
