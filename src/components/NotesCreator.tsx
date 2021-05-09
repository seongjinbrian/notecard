import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../fb";
import { initNote, INIT_NOTE } from "../action/note";
import { RootState } from "../reducer/index";
import { NoteObj } from "../model/Note";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import PaletteOutlinedIcon from "@material-ui/icons/PaletteOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Note from "../components/Note";
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

function NotesCreator() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [cont, setCont] = useState("");
  const [isArch, setIsArch] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const onTitleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };
  const onContChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCont(event.target.value);
  };
  const onArchClick = () => {
    setIsArch(!isArch);
  };
  const onPinClick = () => {
    setIsPin(!isPin);
  };

  const onSubmit = () => {
    if (title.trim() === "" && cont.trim() === "") {
      return;
    }
    const noteData: NoteObj = {
      title: title,
      content: cont,
      isArchived: isArch,
      isPinned: isPin,
    };
  };

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
              onChange={onTitleChange}
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
              onChange={onContChange}
              value={cont}
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
            <Button className={classes.button} onClick={onSubmit}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotesCreator;
