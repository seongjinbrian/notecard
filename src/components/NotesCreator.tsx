import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../fb";
import { initNote, INIT_NOTE } from "../action/note";
import { RootState } from "../reducer/index";
import { NoteObj } from "../model/Note";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { initNotes } from "../firebase/db";
// import Note from "../components/Note";
// import { NoteObj } from "../model/Note";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formBox: {
    margin: "0 6em",
    padding: "0.5em 1.5em",
    borderRadius: "0.5em",
    backgroundColor: "white",
    boxShadow: "0 3px 5px rgb(0 0 0 / 20%)",
  },
  inputWrapper: {
    paddingLeft: "1em",
    margin: "1em 0",
  },
  button: { position: "absolute", right: 0, top: "0.5rem" },
}));

const initial: NoteObj = {
  title: "",
  content: "",
  isPinned: false,
  isArchived: false,
};

function NotesCreator() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState<NoteObj>(initial);
  const { title, content, id, isPinned } = note;
  const [isArch, setIsArch] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const handleUpdateNote = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>
    ): void => {
      console.log(note);
      const { name, value } = e.target;
      setNote({ ...note, [name]: value });
    },
    [note]
  );
  const onArchClick = () => {
    setNote({ ...note, isArchived: !isArch });
    setIsArch(!isArch);
  };
  const onPinClick = () => {
    setNote({ ...note, isPinned: !isPin });
    setIsPin(!isPin);
  };
  const handleAddNote = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (title !== "" && content !== "") {
      initNotes(note);
    }
  };

  const handleResetNote = useCallback((): void => {
    setNote({ ...initial });
  }, []);

  return (
    <div>
      <div className={classes.formBox}>
        <form>
          <div className={classes.inputWrapper}>
            <Input
              name="title"
              placeholder="Title"
              rowsMax={3}
              multiline
              fullWidth
              onChange={handleUpdateNote}
              value={title}
              disableUnderline
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onPinClick}>
                    <RoomOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
            <Input
              name="content"
              rowsMax={10}
              placeholder="Take a note..."
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
              <ArchiveOutlinedIcon onClick={onArchClick} />
            </IconButton>
            {title && content && (
              <Button className={classes.button} onClick={handleAddNote}>
                {" "}
                ADD{" "}
              </Button>
            )}
            {(!title || !content) && (
              <Button className={classes.button} onClick={handleResetNote}>
                {" "}
                Close{" "}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotesCreator;
