
import React, { useState, useEffect } from 'react';
import { TicketCard } from '@/components/TicketCard';
import { CelebrationModal } from '@/components/CelebrationModal';

export interface Ticket {
  id: string;
  title: string;
  venue: string;
  barcode: string;
  isUsed: boolean;
  color: string;
  icon: "sun" | "monitor" | "users" | "video";
  description: string;
}

const initialTickets: Ticket[] = [
  {
    id: "ticket-001",
    title: "Microsoft Teams Movie Night",
    venue: "Virtual Teams Meeting",
    barcode: "TMSNIGHT256015",
    isUsed: false,
    color: "from-blue-500 to-indigo-600",
    icon: "video",
    description: "Join me for a virtual movie night featuring any movie or show of your choice",
  },
  {
    id: "ticket-002",
    title: "Beach Day Outing",
    venue: "Any Beach Of Your Choice",
    barcode: "BEACHDAY257019",
    isUsed: false,
    color: "from-cyan-400 to-teal-500",
    icon: "sun",
    description: "A day of fun in the sun, with snacks",
  },
  {
    id: "ticket-003",
    title: "A Movie Date",
    venue: "Any Cinema At Any Mall/Location Of Your Choosing",
    barcode: "TEC25802256",
    isUsed: false,
    color: "from-violet-500 to-purple-600",
    icon: "monitor",
    description: "Join me for a movie date at the cinema of your choice and the movie of your choice",
  },
  {
    id: "ticket-004",
    title: "A Spa Day",
    venue: "Any Spa Of Your Choice",
    barcode: "TBUILD259001",
    isUsed: false,
    color: "from-emerald-500 to-green-600",
    icon: "users",
    description: "A day of relaxation and pampering at a spa of your choice",
  },
];

const STORAGE_KEY = 'anniversary-tickets-state';

const Index = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationTicket, setCelebrationTicket] = useState<Ticket | null>(null);

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem(STORAGE_KEY);
    if (savedTickets) {
      try {
        const parsedTickets = JSON.parse(savedTickets);
        setTickets(parsedTickets);
      } catch (error) {
        console.error('Error parsing saved tickets:', error);
        setTickets(initialTickets);
      }
    } else {
      setTickets(initialTickets);
    }
  }, []);

  // Save tickets to localStorage whenever tickets state changes
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    }
  }, [tickets]);

  const handleTicketRedeem = (ticketId: string) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, isUsed: true }
          : ticket
      )
    );
    
    const redeemedTicket = tickets.find(ticket => ticket.id === ticketId);
    if (redeemedTicket) {
      setCelebrationTicket(redeemedTicket);
      setShowCelebration(true);
    }
  };

  const availableTickets = tickets.filter(ticket => !ticket.isUsed);
  const redeemedTickets = tickets.filter(ticket => ticket.isUsed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-16 px-4 relative overflow-hidden">
      {/* Romantic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-rose-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl mb-4 block animate-pulse">💕</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Our Love Story
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            A collection of precious moments waiting to unfold. Each ticket is a promise, 
            a dream, and a beautiful memory we'll create together. Our journey of love 
            continues with every experience we share. ✨
          </p>
        </div>

        {/* Available Tickets */}
        {availableTickets.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Awaiting Our Adventures
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-2xl">🌹</span>
                <span className="italic">Choose your next romantic escape</span>
                <span className="text-2xl">🌹</span>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {availableTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onRedeem={handleTicketRedeem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Redeemed Tickets */}
        {redeemedTickets.length > 0 && (
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent mb-4">
                Cherished Memories
              </h2>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <span className="text-2xl">💖</span>
                <span className="italic">Beautiful moments we've shared</span>
                <span className="text-2xl">💖</span>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {redeemedTickets.map((ticket) => (
                <TicketCard 
                  key={ticket.id} 
                  ticket={ticket} 
                  onRedeem={handleTicketRedeem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tickets.every(ticket => ticket.isUsed) && (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 animate-bounce">💕</div>
            <h3 className="text-4xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4">
              All Adventures Complete!
            </h3>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              What a beautiful collection of memories we've created together. 
              Each moment has been a treasure, each experience a gift of love. 
              Our story continues beyond these pages... 💫
            </p>
          </div>
        )}

        <div className="text-center mt-20 pb-8">
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
            <p className="text-lg text-gray-700 italic mb-4">
              "In every shared moment, in every stolen glance, in every adventure together..."
            </p>
            <p className="text-2xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Our love story continues ❤️
            </p>
          </div>
        </div>
      </div>

      <CelebrationModal 
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        ticket={celebrationTicket}
      />
    </div>
  );
};

export default Index;
