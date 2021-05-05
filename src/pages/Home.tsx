import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC, useState } from "react";
import Header from "../components/Header";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

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

const Home: FC = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };
  const onDesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setDes(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div
          style={{
            margin: "0 6em",
            padding: "0.5em 1.5em",
            borderRadius: "0.5em",
            backgroundColor: "white",
            boxShadow: "0 3px 5px rgb(0 0 0 / 20%)",
          }}
        >
          <form>
            <div style={{ paddingLeft: "1em", margin: "1em 0" }}>
              <Input
                name="title"
                // label="Title"
                placeholder="Title"
                // variant="filled"
                rowsMax={3}
                multiline
                fullWidth
                onChange={onTitleChange}
                value={title}
                disableUnderline
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <RoomOutlinedIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Input
                name="description"
                // label="Description"
                rowsMax={10}
                placeholder="Take a note..."
                // variant="filled"
                multiline
                fullWidth
                onChange={onDesChange}
                value={des}
                disableUnderline
              />
            </div>
            <div style={{ position: "relative" }}>
              <IconButton>
                <PaletteOutlinedIcon />
              </IconButton>
              <IconButton>
                <ArchiveOutlinedIcon />
              </IconButton>
              <Button
                style={{
                  position: "absolute",
                  right: 0,
                  top: "0.5rem",
                }}
              >
                Close
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
