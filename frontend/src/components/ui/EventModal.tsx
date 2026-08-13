import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle, Ticket } from 'lucide-react';
import { EventItem } from '../../types/models';
import { LazyImage } from './LazyImage';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [ticketName, setTicketName] = useState('');
  const [ticketRoll, setTicketRoll] = useState('');

  if (!event) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketName || !ticketRoll) return;
    setIsRegistered(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-navy-950/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-3xl glass-panel rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            aria-label="Close Event Modal"
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy-900/80 border border-amber-500/30 text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-all shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Header */}
          <div className="relative h-64 md:h-80 w-full">
            <LazyImage
              src={event.posterUrl}
              alt={event.title}
              widthParam={1200}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent flex flex-col justify-end p-6 md:p-8">
              <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold text-navy-950 bg-gold-400 font-mono tracking-wider mb-2">
                {event.category.toUpperCase()} EVENT
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-white">
                {event.title}
              </h2>
              <p className="text-gold-400 font-semibold tracking-wider uppercase text-sm mt-1">
                {event.subtitle}
              </p>
            </div>
          </div>

          {/* Content & Registration Form */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-navy-900/80 border border-amber-500/15">
              <div className="flex items-center space-x-3 text-sm text-slate-200">
                <Calendar className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Date</p>
                  <p className="font-semibold">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-200">
                <Clock className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Time</p>
                  <p className="font-semibold">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-200">
                <MapPin className="w-5 h-5 text-flame-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Venue</p>
                  <p className="font-semibold">{event.venue}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold font-heading text-slate-100 mb-2">About Event</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{event.description}</p>
            </div>

            {event.agenda && event.agenda.length > 0 && (
              <div>
                <h3 className="text-lg font-bold font-heading text-slate-100 mb-3">Event Timeline</h3>
                <ul className="space-y-2">
                  {event.agenda.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Registration State */}
            {event.isUpcoming && event.registrationOpen && (
              <div className="pt-6 border-t border-amber-500/15">
                {isRegistered ? (
                  <div className="p-6 rounded-xl bg-gold-500/10 border border-gold-500/30 text-center space-y-3">
                    <CheckCircle className="w-12 h-12 text-gold-400 mx-auto" />
                    <h4 className="text-xl font-bold font-heading text-gold-400">Registration Confirmed!</h4>
                    <p className="text-xs text-slate-300">
                      Welcome, <span className="font-semibold text-white">{ticketName}</span> ({ticketRoll}). Your seat is reserved for {event.title}.
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono">PASS ID: SMC-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="flex items-center space-x-2 text-gold-400 font-semibold text-sm">
                      <Ticket className="w-4 h-4" />
                      <span>Reserve Your Seat Now</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={ticketName}
                        onChange={e => setTicketName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Roll Number (e.g. 219N1A0501)"
                        value={ticketRoll}
                        onChange={e => setTicketRoll(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold tracking-wide hover:shadow-gold-glow transition-all"
                    >
                      CONFIRM EVENT REGISTRATION
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
