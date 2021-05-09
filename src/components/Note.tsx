import React, { useState } from "react";
import { NoteObj } from "../model/Note";
import Notes from "../container/Note";

interface NotesProp {
  notes: NoteObj[];
}

const Note = ({ notes }: NotesProp) => {
  const isPinned: boolean =
    notes.filter((note: NoteObj) => note.isPinned).length > 0;
  const noteArr = notes.map((note: NoteObj) => (
    <Notes key={note.id} note={note} />
  ));

  if (isPinned) {
    const pinnedNotes = notes
      .filter((note: NoteObj) => note.isPinned)
      .map((note: NoteObj) => <Notes key={note.id} note={note} />);

    const otherNotes = notes
      .filter((note: NoteObj) => !note.isPinned)
      .map((note: NoteObj) => <Notes key={note.id} note={note} />);

    return (
      <>
        {pinnedNotes}
        {otherNotes}
      </>
    );
  }

  return <>{noteArr}</>;
};

export default React.memo(Note);
