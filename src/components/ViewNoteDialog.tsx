"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { X } from "lucide-react"

interface ViewNoteDialogProps {
  isOpen: boolean
  onClose: () => void
  note: {
    title: string
    content: string
    color: string
  }
}

export default function ViewNoteDialog({ isOpen, onClose, note }: ViewNoteDialogProps) {
  const gradientColors = note.color
    ? note.color.replace("from-", "").replace("to-", "").split(" ")
    : ["#f0f0f0", "#ffffff"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[85vh] bg-white/95 backdrop-blur border-pink-200 rounded-lg p-6 overflow-hidden"
        style={{ background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})` }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800 flex items-center gap-2">📖 View Note</DialogTitle>
          <DialogDescription className="text-gray-600">
            You can read this note. Editing is disabled in view mode.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4 overflow-y-auto pr-2">
          <div>
            <Label className="text-gray-700">Title</Label>
            <div className="mt-2 p-2 bg-white/70 rounded border border-gray-200">{note.title}</div>
          </div>

          <div>
            <Label className="text-gray-700">Content</Label>
            <div className="mt-2 p-2 bg-white/70 rounded border border-gray-200 max-h-[60vh] overflow-y-auto whitespace-pre-wrap">
              {note.content}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
              <X className="w-4 h-4 mr-2" /> Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
