import {NoteState, InitNote, GetNote, ClearNote, NotesAction} from "../action/note";
import * as actions from '../action/note';
  
const initialState: NoteState = {
    note: [],
    writableNote: null,
  };

  const initNotes = (state: NoteState, action: InitNote) => {
    const note = {
      ...state,
      note: action.payload,
    };
    return {
        ...state,
        ...note
    };
  };
  
  const getWritableNote = (state: NoteState, action: GetNote) => {
    const updatedNotes = {
      ...state,
      writableNote: action.payload,
    };
    return {
        ...state,
        ...updatedNotes
    } 
  };
  
  const clearWritableNote = (state: NoteState, action: ClearNote) => {
    const updatedNotes = {
      ...state,
      writableNote: null,
    };
    return {
        ...state,
        ...updatedNotes
    };
  };
  
  const reducer = (state = initialState, action: NotesAction) => {
    switch (action.type) {
      case actions.INIT_NOTE:
        return initNotes(state, action);
      case actions.GET_NOTE:
        return getWritableNote(state, action);
      case actions.CLEAR_NOTE:
        return clearWritableNote(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;