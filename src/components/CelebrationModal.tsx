
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart } from 'lucide-react';
import { Ticket } from '@/pages/Index';
import confetti from 'canvas-confetti';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: Ticket | null;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  isOpen, 
  onClose, 
  ticket 
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger romantic confetti animation with hearts
      const duration = 4000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 80, 
        zIndex: 0,
        shapes: ['heart']
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 60 * (timeLeft / duration);
        
        // Pink hearts from left
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1']
        });
        
        // Rose hearts from right
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1']
        });

        // Center burst
        if (Math.random() > 0.8) {
          confetti({
            ...defaults,
            particleCount: 30,
            origin: { x: 0.5, y: 0.3 },
            colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#dda0dd']
          });
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-rose-50 to-pink-50 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-3 text-2xl">
            <CheckCircle className="text-emerald-500" size={28} />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Ticket Downloaded!
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-8">
          <div className="mb-6 relative">
            <Heart className="mx-auto text-pink-500 animate-pulse" size={56} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-bounce">💕</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {ticket.title}
          </h3>
          
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Your romantic adventure ticket has been downloaded successfully! ✨
          </p>
          
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 rounded-2xl mb-8 border border-pink-200/50 shadow-lg">
            <div className="text-4xl mb-3">🌹</div>
            <p className="text-gray-800 font-medium leading-relaxed">
              This magical experience is now ready to be redeemed. 
              Let's create another beautiful memory together, my love! 
            </p>
            <div className="mt-3 text-2xl">💖✨💫</div>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Continue Our Journey 💕
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
