import { useEffect, useState } from "react";
import { NotesGrid } from "./components/NotesGrid";
import { LoginPage } from "./components/LoginPage";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Button } from "./components/ui/button";
import { LogOut } from "lucide-react";

// Firebase
import { auth } from "./lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Watch Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user.email);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Login handler
  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      alert("Login failed: " + e.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Helper to show friendly names
  const getDisplayName = (email: string | null) => {
    if (!email) return "User";
    const e = email.toLowerCase();
    if (e === "mustafa.tahir12@gmail.com") return "Mustafa";
    if (e === "amnaarif1090@gmail.com") return "Amna";
    return email.split("@")[0];
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1688631681236-6f4d968ec701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNoZXJyeSUyMGJsb3Nzb20lMjBzYWt1cmF8ZW58MXx8fHwxNzU4NzE4ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cherry blossoms background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684852199079-7e50925d94d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJhbWJvbyUyMHplbnxlbnwxfHx8fDE3NTg3Mzg1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Bamboo decoration"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Floating Cherry Blossoms */}
      <div
        className="absolute top-10 left-20 text-4xl opacity-20 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        🌸
      </div>
      <div
        className="absolute top-40 left-40 text-3xl opacity-15 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        🌸
      </div>
      <div
        className="absolute top-60 right-40 text-2xl opacity-10 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      >
        🌸
      </div>
      <div
        className="absolute top-32 right-60 text-3xl opacity-20 animate-bounce"
        style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
      >
        🌸
      </div>

      {/* User Header */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg">
          <span className="text-sm text-gray-600">
            こんにちは, {getDisplayName(currentUser)}
          </span>
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="h-8 px-3 hover:bg-red-50 hover:text-red-600 text-gray-600"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <NotesGrid currentUser={currentUser} />
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-100/20 to-transparent pointer-events-none" />
    </div>
  );
}
