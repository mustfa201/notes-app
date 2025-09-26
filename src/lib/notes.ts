import { db, auth } from "./firebase"
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
} from "firebase/firestore"
import { Note } from "../components/NotesGrid"

// 🔹 Create a new note
export async function createNote({
  ownerEmail,
  title,
  content,
  color,
}: {
  ownerEmail: string
  title: string
  content: string
  color: string
}) {
  const user = auth.currentUser
  if (!user) throw new Error("Not authenticated")

  await addDoc(collection(db, "notes"), {
    ownerEmail,
    createdBy: user.uid,
    title,
    content,
    color,
    createdAt: serverTimestamp(),
  })
}

// 🔹 Update a note by ID
export async function updateNote(
  id: string,
  data: Partial<Pick<Note, "title" | "content" | "color">>
) {
  const noteRef = doc(db, "notes", id)
  await updateDoc(noteRef, data)
}

// 🔹 Delete a note by ID
export async function deleteNoteById(id: string) {
  const noteRef = doc(db, "notes", id)
  await deleteDoc(noteRef)
}

// 🔹 Subscribe to real-time notes (sorted by createdAt)
export function subscribeToNotes(cb: (notes: Note[]) => void) {
  const q = query(collection(db, "notes"), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    const notes = snapshot.docs.map((docSnap) => {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate()
          : new Date(),
      } as Note
    })
    cb(notes)
  })
}
