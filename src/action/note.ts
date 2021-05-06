export interface NoteObj {
    id?: string;
    title: string;
    content: string;
    isArchived: string;
    isPinned: boolean;
    isClicked: boolean;
}

export type WritableNote = NoteObj | null;
export const INIT_NOTE = 'note/INIT_NOTE' as const;
export const GET_NOTE = 'note/GET_NOTE' as const;
export const CLEAR_NOTE = 'note/CLEAR_NOTE' as const;

export interface NoteState {
    note: NoteObj[];
    writableNote: WritableNote;
}

export interface InitNote {
    type: typeof INIT_NOTE;
    payload: NoteObj[];
}

export interface GetNote {
    type: typeof GET_NOTE;
    payload: NoteObj;
}

export interface ClearNote {
    type: typeof CLEAR_NOTE;
}

export const initNote = (note: NoteObj[]) : InitNote => {
    return {
        type: INIT_NOTE,
        payload: note,
    }
}

export const writableNote = (note: NoteObj): GetNote => {
    return {
        type: GET_NOTE,
        payload: note,
    }
}

export const clearEditableNote = (): ClearNote => {
    return {
        type: CLEAR_NOTE,
    }
}
export type NotesAction =
  | InitNote
  | GetNote
  | ClearNote


// export type NotesAction =
//   | ReturnType<typeof initNote>
//   | ReturnType<typeof writableNote>
//   | ReturnType<typeof clearEditableNote>;