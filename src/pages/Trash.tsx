import { makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Trash: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Header /> */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>This is Trash page</Typography>
      </main>
    </div>
  );
};

export default Trash;
