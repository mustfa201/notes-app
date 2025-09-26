"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Eye, Edit3, X, Save } from "lucide-react"

import { Note } from "./NotesGrid"

interface EditNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  note: Note
  onUpdate: (id: string, title: string, content: string, color: string) => void
}

const colorOptions = [
  { name: "Sakura Pink", value: "from-pink-100 to-pink-200", preview: "bg-gradient-to-r from-pink-100 to-pink-200" },
  { name: "Bamboo Green", value: "from-green-100 to-green-200", preview: "bg-gradient-to-r from-green-100 to-green-200" },
  { name: "Ocean Blue", value: "from-blue-100 to-blue-200", preview: "bg-gradient-to-r from-blue-100 to-blue-200" },
  { name: "Sunset Orange", value: "from-orange-100 to-orange-200", preview: "bg-gradient-to-r from-orange-100 to-orange-200" },
  { name: "Lavender Purple", value: "from-purple-100 to-purple-200", preview: "bg-gradient-to-r from-purple-100 to-purple-200" },
  { name: "Emerald", value: "from-emerald-100 to-emerald-200", preview: "bg-gradient-to-r from-emerald-100 to-emerald-200" },
]

export function EditNoteDialog({ isOpen, onClose, note, onUpdate }: EditNoteDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [color, setColor] = useState(colorOptions[0].value)
  const [isEditing, setIsEditing] = useState(true)

  useEffect(() => {
    if (isOpen && note) {
      setTitle(note.title)
      setContent(note.content)
      setColor(note.color || colorOptions[0].value)
      setIsEditing(true)
    }
  }, [isOpen, note])

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (title.trim() && content.trim()) {
      onUpdate(note.id, title.trim(), content.trim(), color)
      onClose()
    }
  }

  const handleClose = () => {
    // Auto-save if there are changes
    if ((title.trim() && title !== note.title) || (content.trim() && content !== note.content) || color !== note.color) {
      onUpdate(note.id, title.trim(), content.trim(), color)
    }

    setTitle(note.title)
    setContent(note.content)
    setColor(note.color || colorOptions[0].value)
    setIsEditing(true)
    onClose()
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setTitle(note.title)
      setContent(note.content)
      setColor(note.color || colorOptions[0].value)
    }
    setIsEditing(!isEditing)
  }

  const formatDate = (date: any) => {
    try {
      const d = date?.toDate ? date.toDate() : new Date(date)
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl h-[85vh] bg-white/95 backdrop-blur border-pink-200 flex flex-col">
        {/* Header */}
        <DialogHeader className="px-4 py-4 flex justify-between items-start">
          <div>
            <DialogTitle className="text-xl text-gray-800 flex items-center gap-2">
              {isEditing ? "📝 ノートを編集 (Edit Note)" : "👁️ ノートを読む (Read Note)"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isEditing
                ? "Update your note content and title. Save when finished."
                : "Reading your note. Switch to edit mode to make changes."}
            </DialogDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleEditToggle}
            className="border-pink-200 hover:bg-pink-50 text-pink-600 bg-transparent"
          >
            {isEditing ? <><Eye className="w-4 h-4 mr-2" /> View Mode</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Mode</>}
          </Button>
        </DialogHeader>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {isEditing ? (
            <form id="edit-note-form" onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div>
                <Label htmlFor="edit-title" className="text-gray-700">Title</Label>
                <Input
                  id="edit-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="mt-2 bg-white/70 border-pink-200 focus:border-pink-300"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-content" className="text-gray-700">Content</Label>
                <textarea
                  id="edit-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note..."
                  className="w-full p-3 mt-2 bg-white/70 border-pink-200 rounded-lg resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-pink-400"
                  style={{ lineHeight: "1.6", minHeight: "45vh", maxHeight: "65vh" }}
                  required
                />
              </div>

              <div>
                <Label className="text-gray-700">Note Color</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${color === c.value ? "border-pink-400 ring-2 ring-pink-200" : "border-gray-200 hover:border-pink-300"}`}
                    >
                      <div className={`w-full h-8 rounded ${c.preview} mb-2`} />
                      <span className="text-xs text-gray-600">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <div>
              <h1 className="text-2xl text-gray-900 mb-4 break-words">{note.title}</h1>
              <p className="text-sm text-gray-500 mb-4">Created: {formatDate(note.createdAt)}</p>
              <div className="whitespace-pre-wrap break-words leading-relaxed text-gray-800">{note.content}</div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t bg-white flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={handleClose} className="border-gray-300 hover:bg-gray-50 bg-transparent">
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button type="submit" form="edit-note-form" className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-0">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={handleClose}><X className="w-4 h-4 mr-2" /> Close</Button>
              <Button type="button" onClick={handleEditToggle} className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-0">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Note
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
