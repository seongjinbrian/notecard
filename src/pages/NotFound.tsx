import { makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const NotFound: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography paragraph>Page not found</Typography>
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default NotFound;
