import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsLoading(true);
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin(email.trim(), password.trim());
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50 relative overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1588696486907-63166196d70b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHplbiUyMGdhcmRlbiUyMHBlYWNlZnVsfGVufDF8fHx8MTc1ODgyNTg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Zen garden background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-24 h-24 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1688631681236-6f4d968ec701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNoZXJyeSUyMGJsb3Nzb20lMjBzYWt1cmF8ZW58MXx8fHwxNzU4NzE4ODg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cherry blossom decoration"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-15">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1684852199079-7e50925d94d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGJhbWJvbyUyMHplbnxlbnwxfHx8fDE3NTg3Mzg1MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Bamboo decoration"
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Floating Cherry Blossoms */}
      <motion.div 
        className="absolute top-16 left-40 text-3xl opacity-30"
        animate={{ 
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🌸
      </motion.div>
      
      <motion.div 
        className="absolute top-32 right-40 text-4xl opacity-25"
        animate={{ 
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🌸
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-32 text-2xl opacity-20"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        🌸
      </motion.div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="p-8 bg-white/90 backdrop-blur-md border-0 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="text-6xl mb-4"
            >
              🌸
            </motion.div>
            <h1 className="text-3xl mb-2 text-gray-800">
              和ノート (Wa Notes)
            </h1>
            <p className="text-gray-600">
              Welcome back to your mindful notes
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email / メール
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="pl-10 bg-white/70 border-pink-200 focus:border-pink-300 focus:ring-pink-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Password / パスワード
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password..."
                  className="pl-10 pr-10 bg-white/70 border-pink-200 focus:border-pink-300 focus:ring-pink-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Demo Note */}
            <div className="text-xs text-center text-gray-500 bg-pink-50 p-3 rounded-lg border border-pink-100">
              <p className="mb-1">🌸 Demo Mode - Use any email and password</p>
              <p>Experience the beauty of Japanese note-taking</p>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white border-0 py-3"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  ログイン (Sign In)
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              "The way of notes leads to mindful thoughts" - 道は心に通ず
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-100/30 to-transparent pointer-events-none" />
    </div>
  );
}