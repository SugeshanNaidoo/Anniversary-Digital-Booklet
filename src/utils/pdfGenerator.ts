
import jsPDF from 'jspdf';
import { Ticket } from '@/pages/Index';

export const generateTicketPDF = (ticket: Ticket) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Set up colors and fonts
  const primaryColor = '#1f2937';
  const accentColor = '#ec4899';
  
  // Background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, 'F');
  
  // Header section with gradient-like effect
  doc.setFillColor(239, 68, 68);
  doc.rect(20, 20, 170, 40, 'F');
  
  // Ticket title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('ANNIVERSARY TICKET', 105, 35, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text(ticket.title, 105, 50, { align: 'center' });
  
  // Main content area
  doc.setFillColor(255, 255, 255);
  doc.rect(20, 70, 170, 180, 'F');
  
  // Border
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(1);
  doc.rect(20, 70, 170, 180);
  
  // Content
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.text('Event Details', 30, 90);
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  
  // Venue
  doc.setFont(undefined, 'bold');
  doc.text('Venue:', 30, 110);
  doc.setFont(undefined, 'normal');
  const venueLines = doc.splitTextToSize(ticket.venue, 150);
  doc.text(venueLines, 30, 120);
  
  // Description
  doc.setFont(undefined, 'bold');
  doc.text('Description:', 30, 150);
  doc.setFont(undefined, 'normal');
  const descLines = doc.splitTextToSize(ticket.description, 150);
  doc.text(descLines, 30, 160);
  
  // Barcode section
  doc.setFillColor(243, 244, 246);
  doc.rect(30, 190, 150, 30, 'F');
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('TICKET CODE:', 35, 200);
  
  doc.setFontSize(14);
  doc.setFont('courier', 'normal');
  doc.text(ticket.barcode, 35, 210);
  
  // QR code placeholder (simple rectangle)
  doc.setFillColor(0, 0, 0);
  doc.rect(150, 195, 20, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text('QR', 158, 207);
  
  // Footer
  doc.setTextColor(107, 114, 128);
  doc.setFontSize(10);
  doc.setFont(undefined, 'italic');
  doc.text('This ticket is valid for one redemption only.', 105, 270, { align: 'center' });
  doc.text('Present this ticket to redeem your experience.', 105, 280, { align: 'center' });
  
  // Generate timestamp
  const timestamp = new Date().toLocaleDateString();
  doc.text(`Generated on: ${timestamp}`, 105, 290, { align: 'center' });
  
  // Save the PDF
  doc.save(`${ticket.title.replace(/\s+/g, '_')}_Ticket.pdf`);
};
