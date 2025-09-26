"use client"

import { useEffect, useState } from "react"
import { NoteCard } from "./NoteCard"
import { AddNoteDialog } from "./AddNoteDialog"
import { EditNoteDialog } from "./EditNoteDialog"
import ViewNoteDialog from "./ViewNoteDialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus, Search } from "lucide-react"

import {
  createNote,
  subscribeToNotes,
  updateNote,
  deleteNoteById,
} from "../lib/notes"
import { auth } from "../lib/firebase"

export interface Note {
  id: string
  title: string
  content: string
  createdAt: any // Firestore Timestamp
  color: string
  ownerEmail: string
  createdBy: string
}

function NotesGrid() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [viewingNote, setViewingNote] = useState<Note | null>(null)

  // 🔹 Subscribe to Firestore notes
  useEffect(() => {
    const unsubscribe = subscribeToNotes((fetchedNotes) => {
      setNotes(fetchedNotes as Note[])
    })
    return () => unsubscribe()
  }, [])

  // 🔹 Add note
  const addNote = async (title: string, content: string, color: string) => {
    const user = auth.currentUser
    if (!user) return alert("You must be logged in to add notes")
    await createNote({
      ownerEmail: user.email!,
      title,
      content,
      color,
    })
  }

  // 🔹 Update note
  const updateNoteHandler = async (
    id: string,
    title: string,
    content: string,
    color?: string
  ) => {
    try {
      await updateNote(id, { title, content, color })
      setEditingNote(null)
    } catch (err) {
      console.error("Error updating note:", err)
    }
  }

  // 🔹 Delete note
  const deleteNoteHandler = async (id: string) => {
    await deleteNoteById(id)
  }

  // 🔹 Search filter
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header (Sticky) */}
      <div className="mb-8 sticky top-0 bg-white/80 backdrop-blur z-10 py-4">
        <h1 className="text-4xl mb-2 text-gray-800">🌸私たちのメモ</h1>
        <p className="text-gray-600 mb-6">
          I Love You So Much !!
        </p>

        {/* Search + Add */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur border-pink-200 focus:border-pink-300"
            />
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            新しいノート (New Note)
          </Button>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onUpdate={updateNoteHandler}
            onDelete={deleteNoteHandler}
            onEdit={() => setEditingNote(note)}
            onView={() => setViewingNote(note)}
          />
        ))}
      </div>

      {/* Empty States */}
      {filteredNotes.length === 0 && searchQuery && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">🔍</div>
          <p>No notes found matching "{searchQuery}"</p>
        </div>
      )}
      {notes.length === 0 && !searchQuery && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-6xl mb-4">🌸</div>
          <p>Create your first note to begin your journey</p>
        </div>
      )}

      {/* Add Note Dialog */}
      <AddNoteDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addNote}
        currentUser={auth.currentUser?.email || null}
      />

      {/* Edit Note Dialog */}
      {editingNote && (
        <EditNoteDialog
          isOpen={!!editingNote}
          onClose={() => setEditingNote(null)}
          note={editingNote}
          onUpdate={updateNoteHandler}
        />
      )}

      {/* View Note Dialog */}
      {viewingNote && (
        <ViewNoteDialog
          isOpen={!!viewingNote}
          onClose={() => setViewingNote(null)}
          note={viewingNote}
        />
      )}
    </div>
  )
}

export default NotesGrid
