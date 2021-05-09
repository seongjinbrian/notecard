import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { FC, useState, useCallback } from "react";
import Header from "../components/Header";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { ViewProp } from "../model/profile";
import { NoteObj } from "../model/Note";
import { initNote } from "../firebase/db";
import { isCompositeComponentWithType } from "react-dom/test-utils";
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

type UpdateNoteEvent =
  | React.ChangeEvent<HTMLTextAreaElement>
  | React.ChangeEvent<HTMLInputElement>;

const Layout = ({ user, children }: ViewProp) => {
  const classes = useStyles();
  // const [ttl, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const onTitleChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   setTitle(event.target.value);
  // };
  // const onDesChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   setDes(event.target.value);
  // };

  const initialNote: NoteObj = {
    title: "",
    content: "",
    isClicked: false,
    isPinned: false,
    isArchived: false,
  };
  const [memo, setMemo] = useState<NoteObj>(initialNote);
  const { title, content, id, isClicked, isPinned } = memo;
  const handleUpdateNote = useCallback(
    (e: UpdateNoteEvent): void => {
      const { name, value } = e.target;
      setMemo({ ...memo, [name]: value });
    },
    [memo]
  );

  const handleResetNote = useCallback((): void => {
    console.log("Hello?");
    setMemo({ ...initialNote });
  }, []);

  const handleAddNote = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      memo: NoteObj
    ): Promise<void> => {
      console.log(1);
      e.preventDefault();
      if (title !== "" && content !== "") {
        initNote(memo);
        handleResetNote();
      }
    },
    [title, content, handleResetNote]
  );
  return (
    <div className={classes.root}>
      <Header user={user} />
      {children}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <div
          style={{
            margin: "0 6em",
            padding: "0.5em 1.5em",
            borderRadius: "0.5em",
            backgroundColor: "white",
            boxShadow: "0 3px 5px rgb(0 0 0 / 20%)",
          }}
        > */}
        {/* <form>
            <div style={{ paddingLeft: "1em", margin: "1em 0" }}>
              <Input
                name="title"
                // label="Title"
                placeholder="Title"
                // variant="filled"
                rowsMax={3}
                multiline
                fullWidth
                onChange={handleUpdateNote}
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
                name="content"
                // label="Description"
                rowsMax={10}
                placeholder="Take a note..."
                // variant="filled"
                multiline
                fullWidth
                onChange={handleUpdateNote}
                value={content}
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
              {title && content && (
                <button
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "0.5rem",
                  }}
                  onClick={() => handleAddNote}
                >
                  {" "}
                  ADD{" "}
                </button>
              )}
              {!title ||
                (!content && (
                  <Button
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "0.5rem",
                    }}
                    onClick={() => handleResetNote}
                  >
                    {" "}
                    Close{" "}
                  </Button>
                ))}
            </div>
          </form> */}
        {/* </div> */}
      </main>
    </div>
  );
};

export default Layout;
