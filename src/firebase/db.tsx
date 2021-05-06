import { db } from '../fb';
import { Note } from '../model/Note'
export const add= async (note: Note): Promise<void> => {
    await db.collection('notes').add(note);
  };
  