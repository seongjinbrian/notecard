import { db } from '../fb';
import { Note } from '../model/Note'
export const initNote = async (note: Note): Promise<void> => {
    await db.collection('notes').add(note);
};

export const deleteNote = async (doc_id: string): Promise<void> => {
  // await db.doc(`notes/${doc_id}`).delete();
  await db.collection('notes').doc(`${doc_id}`).delete();
};

export const editNote = async (
  doc_id: string,
  name: string,
  value: string,
): Promise<void> => {
  // await db.doc(`notes/${doc_id}`).update({ [name]: value });
  await db.collection('notes').doc(`${doc_id}`).update({ [name]: value });
};

export const togglePin = async (
  doc_id: string,
  isPinned: boolean,
): Promise<void> => {
  // await db.doc(`notes/${doc_id}`).update({ isPinned: isPinned });
  await db.collection('notes').doc(`${doc_id}`).update({ isPinned: isPinned });
};