import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Save, X } from "lucide-react";
import { auth } from "../lib/firebase";

interface AddNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    title: string,
    content: string,
    color: string,
    createdBy: string
  ) => void;
}

const colorOptions = [
  { name: "Sakura Pink", value: "from-pink-100 to-pink-200", preview: "bg-gradient-to-r from-pink-100 to-pink-200" },
  { name: "Bamboo Green", value: "from-green-100 to-green-200", preview: "bg-gradient-to-r from-green-100 to-green-200" },
  { name: "Ocean Blue", value: "from-blue-100 to-blue-200", preview: "bg-gradient-to-r from-blue-100 to-blue-200" },
  { name: "Sunset Orange", value: "from-orange-100 to-orange-200", preview: "bg-gradient-to-r from-orange-100 to-orange-200" },
  { name: "Lavender Purple", value: "from-purple-100 to-purple-200", preview: "bg-gradient-to-r from-purple-100 to-purple-200" },
  { name: "Emerald", value: "from-emerald-100 to-emerald-200", preview: "bg-gradient-to-r from-emerald-100 to-emerald-200" },
];

export function AddNoteDialog({ isOpen, onClose, onAdd }: AddNoteDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);

  // Map email to display name
  const getDisplayName = (email: string | null) => {
    if (!email) return "User";
    const e = email.toLowerCase();
    if (e === "mustafa.tahir12@gmail.com") return "Mustafa";
    if (e === "amnaarif1090@gmail.com") return "Amna";
    return email.split("@")[0];
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (title.trim() && content.trim()) {
      const user = auth.currentUser;
      const createdBy = getDisplayName(user?.email || null);

      onAdd(title.trim(), content.trim(), selectedColor, createdBy);

      setTitle("");
      setContent("");
      setSelectedColor(colorOptions[0].value);
      onClose();
    }
  };

  const handleClose = () => {
    // Auto-save if there's content
    if (title.trim() || content.trim()) {
      const user = auth.currentUser;
      const createdBy = getDisplayName(user?.email || null);
      onAdd(title.trim(), content.trim(), selectedColor, createdBy);
    }

    setTitle("");
    setContent("");
    setSelectedColor(colorOptions[0].value);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="max-w-4xl w-full h-[85vh] bg-white/95 backdrop-blur border-pink-200 p-0 flex flex-col"
      >
        <div className="flex flex-col px-4 py-4 flex-1 overflow-y-auto">
          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-800 flex items-center gap-2">
              🌸 新しいノートを作成 (Create New Note)
            </DialogTitle>
            <DialogDescription className="text-gray-600 mt-1">
              Create a new note
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form
            id="add-note-form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 mt-4"
          >
            <div>
              <Label htmlFor="title" className="text-gray-700">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="mt-2 bg-white/70 border-pink-200 focus:border-pink-300"
                required
              />
            </div>

            <div>
              <Label htmlFor="content" className="text-gray-700">Content</Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 mt-2 bg-white/70 border-pink-200 rounded-lg resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-pink-400"
                style={{ lineHeight: "1.6", minHeight: "40vh" }}
                required
              />
            </div>

            <div>
              <Label className="text-gray-700">Note Color</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-pink-400 ring-2 ring-pink-200"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className={`w-full h-8 rounded ${color.preview} mb-2`} />
                    <span className="text-xs text-gray-600">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t bg-white flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border-gray-300 hover:bg-gray-50"
          >
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>

          <Button
            type="submit"
            form="add-note-form"
            className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-0"
          >
            <Save className="w-4 h-4 mr-2" /> Create Note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
