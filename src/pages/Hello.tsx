import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../fb";
import { initNote } from "../action/note";
import { RootState } from "../reducer/index";
import { NoteObj } from "../model/Note";
import Note from "../components/Note";
function Notes() {
  const notes = useSelector((state: RootState) => state.note.note).filter(
    (note: NoteObj) => note.isArchived === false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const init = db.collection("notes").onSnapshot((snapshot) => {
      const noteArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        isClicked: doc.data().isChecked,
        isPinned: doc.data().isPinned,
        isArchived: doc.data().isArchived,
        content: doc.data().content,
      }));
      dispatch(initNote(noteArr));
    });
    return () => init();
  }, [dispatch]);
  return (
    <div>
      <Note notes={notes} />
    </div>
  );
}

export default Notes;
