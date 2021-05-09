import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { NoteTitle, NoteContent } from "containers/Note/NoteElements";
// import NoteLayout from "containers/Note/NoteLayout";
// import { Input, TextArea } from "containers/InputField/InputElements";

import { writableNote, clearEditableNote } from "../action/note";
import { editNote, deleteNote } from "../firebase/db";

import { NoteObj } from "../model/Note";
import { RootState } from "../reducer/index";
import styled, { keyframes, css } from "styled-components";

export const NoteTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  width: 100%;
  padding: 12px 12px 0 12px;
`;
export const NoteContent = styled.div`
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 0 12px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
`;
export const Input = styled("input")<{ isEditable?: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  font-weight: 500;
  font-size: 1.6rem;
  background: transparent;
  ${({ isEditable }) =>
    isEditable &&
    `
    font-size: 2rem;
    height: 50px;
    padding: 1rem 1.5rem;
    `};
`;
export const TextArea = styled("textarea")<{ isEditable?: boolean }>`
  width: 100%;
  border: none;
  outline: none;
  font-family: inherit;
  line-height: 1.5;
  background: inherit;
  margin-top: 1.2rem;
  resize: none;
  flex: 1 1 auto;
  ${({ isEditable }) =>
    isEditable &&
    `
    font-size: 1.7rem; 
    padding: 0 12px 0 12px;  
    margin-top: 0;
    `};
`;
interface NoteProp {
  note: NoteObj;
}

type BlurEventType =
  | React.FocusEvent<HTMLInputElement>
  | React.FocusEvent<HTMLTextAreaElement>;

const Notes = ({ note }: NoteProp) => {
  const { title, content, id, isClicked } = note;
  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const editableNote = useSelector(
    (state: RootState) => state.note.writableNote
  );
  const editableNoteID: string | null | undefined =
    editableNote && editableNote.id;

  useEffect(() => {
    if (editableNote && editableNote.id === id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [editableNote, id]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      const event = e.target as HTMLElement;

      if (
        event.tagName !== "BUTTON" &&
        event.getAttribute("type") !== "checkbox" &&
        !editableNoteID
      ) {
        dispatch(writableNote(note));
      }
    },
    [dispatch, editableNoteID, note]
  );

  const handleDelete = useCallback(
    async (id: string): Promise<void> => {
      dispatch(clearEditableNote());
      deleteNote(id);
    },
    [dispatch]
  );

  const handleBlur = useCallback(
    async (e: BlurEventType, id: string | undefined): Promise<void> => {
      const { name, value } = e.target;
      if (id) editNote(id, name, value);
    },
    []
  );

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      dispatch(clearEditableNote());
    },
    [dispatch]
  );

  const noteLayoutProps = {
    note,
    isHovering,
    clicked: isEditing ? 1 : 0,
    setIsHovering,
    onClick: handleClick,
    onDelete: handleDelete,
    onClose: handleClose,
  };

  if (isEditing) {
    return (
      <div>
        <Input
          name="title"
          placeholder="Title"
          autoComplete="off"
          isEditable
          defaultValue={title}
          onBlur={(e: any) => handleBlur(e, id)}
        />
        <TextArea
          name="content"
          placeholder="Note"
          autoComplete="off"
          isEditable
          defaultValue={content}
          onBlur={(e: any) => handleBlur(e, id)}
        />
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div>
        <NoteTitle>{title}</NoteTitle>
        <NoteContent>{content}</NoteContent>
      </div>
    );
  }
  return null;
};

export default React.memo(Notes);
