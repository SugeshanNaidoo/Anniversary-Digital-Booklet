
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sun, Monitor, Download, Users, Video } from 'lucide-react';
import { Ticket } from '@/pages/Index';
import { generateTicketPDF } from '@/utils/pdfGenerator';

interface TicketCardProps {
  ticket: Ticket;
  onRedeem: (ticketId: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onRedeem }) => {
  const getIconComponent = () => {
    switch (ticket.icon) {
      case 'sun':
        return Sun;
      case 'monitor':
        return Monitor;
      case 'users':
        return Users;
      case 'video':
        return Video;
      default:
        return Monitor;
    }
  };

  const IconComponent = getIconComponent();

  const handleDownload = () => {
    generateTicketPDF(ticket);
    onRedeem(ticket.id);
  };

  return (
    <Card className={`overflow-hidden transition-all duration-500 group ${
      ticket.isUsed 
        ? 'opacity-70 grayscale transform scale-95' 
        : 'hover:scale-105 hover:shadow-2xl hover:shadow-pink-200/50'
    }`}>
      <div className={`h-56 bg-gradient-to-br ${ticket.color} p-8 text-white relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>
        
        <div className="flex justify-between items-start h-full relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <IconComponent size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold leading-tight">{ticket.title}</h3>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 mb-4">
              <p className="text-white/90 text-sm font-medium">{ticket.venue}</p>
            </div>
            <div className="inline-block bg-black/20 backdrop-blur-sm rounded-md px-3 py-1">
              <p className="text-white/80 text-xs font-mono tracking-wider">{ticket.barcode}</p>
            </div>
          </div>
        </div>
        
        {ticket.isUsed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-2xl border border-white/30">
              <span className="text-white font-bold text-xl tracking-wide">REDEEMED ✨</span>
            </div>
          </div>
        )}

        {/* Heart decoration for non-used tickets */}
        {!ticket.isUsed && (
          <div className="absolute top-4 right-4 text-white/30 group-hover:text-white/60 transition-colors duration-300 text-2xl">
            💕
          </div>
        )}
      </div>
      
      <div className="p-8 bg-gradient-to-b from-white to-rose-50/30">
        <p className="text-gray-700 mb-8 leading-relaxed text-lg font-light">{ticket.description}</p>
        
        {!ticket.isUsed ? (
          <Button 
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Download className="mr-3" size={20} />
            Download Our Ticket ✨
          </Button>
        ) : (
          <div className="text-center py-4 text-gray-500 font-medium bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <span className="text-2xl mb-2 block">💖</span>
            This beautiful memory has been created
          </div>
        )}
      </div>
    </Card>
  );
};
