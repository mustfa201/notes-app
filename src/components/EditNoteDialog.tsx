import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Save, X } from "lucide-react";

interface EditNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, title: string, content: string, color: string) => void;
  noteId: string;
  existingTitle: string;
  existingContent: string;
  existingColor: string;
}

const colorOptions = [
  { name: "Sakura Pink", value: "from-pink-100 to-pink-200", preview: "bg-gradient-to-r from-pink-100 to-pink-200" },
  { name: "Bamboo Green", value: "from-green-100 to-green-200", preview: "bg-gradient-to-r from-green-100 to-green-200" },
  { name: "Ocean Blue", value: "from-blue-100 to-blue-200", preview: "bg-gradient-to-r from-blue-100 to-blue-200" },
  { name: "Sunset Orange", value: "from-orange-100 to-orange-200", preview: "bg-gradient-to-r from-orange-100 to-orange-200" },
  { name: "Lavender Purple", value: "from-purple-100 to-purple-200", preview: "bg-gradient-to-r from-purple-100 to-purple-200" },
  { name: "Emerald", value: "from-emerald-100 to-emerald-200", preview: "bg-gradient-to-r from-emerald-100 to-emerald-200" },
];

export default function EditNoteDialog({
  isOpen,
  onClose,
  onUpdate,
  noteId,
  existingTitle="",
  existingContent="",
  existingColor="",
}: EditNoteDialogProps) {
  const [title, setTitle] = useState(existingTitle);
  const [content, setContent] = useState(existingContent);
  const [selectedColor, setSelectedColor] = useState(existingColor);

  // Load note data when dialog opens
  useEffect(() => {
    setTitle(existingTitle);
    setContent(existingContent);
    setSelectedColor(existingColor);
  }, [isOpen, existingTitle, existingContent, existingColor]);

  // Auto-save as user types
  useEffect(() => {
    if (!title.trim() && !content.trim()) return;
    const timeout = setTimeout(() => {
      onUpdate(noteId, title.trim(), content.trim(), selectedColor);
    }, 500);
    return () => clearTimeout(timeout);
  }, [title, content, selectedColor, noteId, onUpdate]);

  const handleClose = () => {
    setTitle("");
    setContent("");
    onClose();
  };

  const gradientColors = selectedColor
  .replace("from-", "")
  .replace("to-", "")
  .split(" ");


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-2xl bg-white/95 backdrop-blur border-pink-200 rounded-lg"
        style={{
          background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800 flex items-center gap-2">
            🌸 Edit Note
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Edit your note. Changes save automatically. You can also change the background color.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6">
          {/* Title */}
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

          {/* Content */}
          <div>
            <Label htmlFor="content" className="text-gray-700">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              rows={8}
              className="mt-2 bg-white/70 border-pink-200 focus:border-pink-300 resize-none"
              required
            />
          </div>

          {/* Color Selection */}
          <div>
            <Label className="text-gray-700">Note Color</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${selectedColor === color.value
                      ? "border-pink-400 ring-2 ring-pink-200"
                      : "border-gray-200 hover:border-pink-300"
                    }`}
                >
                  <div className={`w-full h-8 rounded ${color.preview} mb-2`} />
                  <span className="text-xs text-gray-600">{color.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const random = colorOptions[Math.floor(Math.random() * colorOptions.length)];
                  setSelectedColor(random.value);
                }}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Change Background Randomly
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-gray-300 hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button
              type="button"
              onClick={() => onUpdate(noteId, title.trim(), content.trim(), selectedColor)}
              className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-0"
            >
              <Save className="w-4 h-4 mr-2" /> Update Note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
