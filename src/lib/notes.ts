import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export async function createNote({ ownerEmail, title, content, color }: any) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, "notes"), {
    ownerEmail,
    createdBy: user.uid, // required by rules
    title,
    content,
    color,
    createdAt: serverTimestamp(),
  });
}

export async function updateNote(id: string, data: any) {
  const noteRef = doc(db, "notes", id);
  await updateDoc(noteRef, data);
}

export async function deleteNoteById(id: string) {
  const noteRef = doc(db, "notes", id);
  await deleteDoc(noteRef);
}

export function subscribeToNotes(cb: (notes: any[]) => void) {
  const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    cb(notes);
  });
}
