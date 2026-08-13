import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FirstFrameBanner } from '../components/home/FirstFrameBanner';
import { EventModal } from '../components/ui/EventModal';
import { EVENTS_DATA } from '../data/events';
import { EventItem } from '../types/models';
import { LazyImage } from '../components/ui/LazyImage';
import { Calendar, MapPin } from 'lucide-react';
import { apiFetchEvents } from '../api/client';
import { isEventUpcoming, parseEventDate } from '../utils/dateUtils';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    apiFetchEvents()
      .then(data => {
        if (isMounted && data && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(err => {
        console.error('Error fetching events from API:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const upcomingEvents = events
    .filter(e => isEventUpcoming(e))
    .sort((a, b) => {
      const da = parseEventDate(a.date, a.time)?.getTime() || 0;
      const db = parseEventDate(b.date, b.time)?.getTime() || 0;
      return da - db;
    });

  const pastEvents = events
    .filter(e => !isEventUpcoming(e))
    .sort((a, b) => {
      const da = parseEventDate(a.date, a.time)?.getTime() || 0;
      const db = parseEventDate(b.date, b.time)?.getTime() || 0;
      return db - da;
    });

  const featuredEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : events[0];
  const additionalUpcomingEvents = upcomingEvents.length > 1 ? upcomingEvents.slice(1) : [];


  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        <div>
          <SectionHeading
            badge="SPOTLIGHT"
            title="UPCOMING EVENTS"
            subtitle="Be part of live media launches, workshops, screenings, and festivals."
          />

          <FirstFrameBanner event={featuredEvent} />

          {/* Additional Upcoming Events Grid */}
          {additionalUpcomingEvents.length > 0 && (
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-bold font-heading text-gold-400 uppercase tracking-wider">
                MORE UPCOMING EVENTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {additionalUpcomingEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className="group rounded-2xl overflow-hidden glass-panel border border-gold-500/30 shadow-gold-glow flex flex-col justify-between hover:border-gold-400 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden bg-navy-900">
                      <LazyImage
                        src={evt.posterUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'}
                        alt={evt.title}
                        widthParam={800}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-navy-950 bg-gold-400 font-mono">
                        {evt.category}
                      </span>
                    </div>

                    <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                          {evt.title}
                        </h3>
                        {evt.subtitle && (
                          <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mt-0.5">
                            {evt.subtitle}
                          </p>
                        )}
                        <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-amber-500/10 text-xs text-slate-400 space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3.5 h-3.5 text-gold-400" />
                          <span>{evt.date} {evt.time ? `• ${evt.time}` : ''}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-flame-400" />
                          <span>{evt.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Past Events Archive */}
        <div>
          <SectionHeading
            badge="ARCHIVE"
            title="PAST EVENTS & RECAPS"
            subtitle="Highlights from past campus workshops, screenings, and competitions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="group rounded-2xl overflow-hidden glass-panel border border-amber-500/20 shadow-card-dark flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden bg-navy-900">
                  <LazyImage
                    src={evt.posterUrl || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'}
                    alt={evt.title}
                    widthParam={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-navy-950 bg-gold-400 font-mono">
                    {evt.category}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold-300 transition-colors">
                      {evt.title}
                    </h3>
                    {evt.subtitle && (
                      <p className="text-xs font-semibold text-gold-400 uppercase tracking-wider mt-0.5">
                        {evt.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-500/10 text-xs text-slate-400 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3.5 h-3.5 text-gold-400" />
                      <span>{evt.date} {evt.time ? `• ${evt.time}` : ''}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-flame-400" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </PageLayout>
  );
};

