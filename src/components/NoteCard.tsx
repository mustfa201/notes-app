import { useState } from "react";
import { Note } from "./NotesGrid";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import EditNoteDialog from "./EditNoteDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Edit, Trash2, Calendar } from "lucide-react";
import { motion } from "motion/react";

// 🎨 Helper: fallback colors
const getDefaultColorForEmail = (email?: string | null) => {
  if (!email) return "from-gray-100 to-gray-200";
  const e = email.toLowerCase();
  if (e === "mustafa.tahir12@gmail.com")
    return "from-orange-200 via-orange-100 to-white"; // orangish
  if (e === "amnaarif1090@gmail.com")
    return "from-pink-200 via-pink-100 to-white"; // pinkish
  return "from-gray-100 to-gray-200";
};

// 👤 Helper: map email → display name
const getDisplayName = (email?: string | null) => {
  if (!email) return "Unknown";
  const e = email.toLowerCase();
  if (e === "mustafa.tahir12@gmail.com") return "Mustafa";
  if (e === "amnaarif1090@gmail.com") return "Amna";
  return email.split("@")[0]; // fallback to before @
};

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, title: string, content: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Decide background
  const bgGradient = note.color
    ? note.color
    : getDefaultColorForEmail(note.ownerEmail);

  // ✅ Fix: handle Firestore Timestamps safely
  const formatDate = (date: any) => {
    if (!date) return "—";

    let jsDate: Date;
    if (date.toDate) {
      jsDate = date.toDate(); // Firestore Timestamp
    } else if (date instanceof Date) {
      jsDate = date;
    } else {
      return "—";
    }

    return jsDate.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`group p-6 h-full bg-gradient-to-br ${bgGradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-800 line-clamp-2 flex-1 mr-2">
              {note.title}
            </h3>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
                className="p-2 h-8 w-8 hover:bg-white/50 text-gray-600 hover:text-gray-800"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-8 w-8 hover:bg-red-100 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white/95 backdrop-blur border-pink-200">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{note.title}"? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:bg-gray-100">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(note.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {truncateContent(note.content)}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-gray-600 border-t border-white/30 pt-3">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(note.createdAt)}
            </div>
            <div className="italic text-gray-500">
              Written by {getDisplayName(note.ownerEmail)}
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
      </Card>

      <EditNoteDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        note={note}
        onUpdate={onUpdate}
      />
    </motion.div>
  );
}
