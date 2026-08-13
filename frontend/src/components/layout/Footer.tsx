import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Instagram, Youtube, Linkedin, MapPin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-navy-950 border-t border-amber-500/15 overflow-hidden pt-16 pb-12 text-slate-400">
      {/* Background Subtle Glow Overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-glow pointer-events-none opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-amber-500/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 p-0.5 shadow-gold-glow">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gold-400" />
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  SREYAS INSTITUTE
                </span>
                <span className="block text-xl font-extrabold font-heading text-white tracking-tight">
                  MEDIA CLUB
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              CREATE. CAPTURE. CONNECT.
              <br />
              More than media, we build memories. Capturing campus stories, filmmaking, videography, and student conversations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-flame-400 hover:border-flame-500/40 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-gold-400 pl-2">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-gold-400 transition-colors">
                  Creative Teams
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-gold-400 transition-colors">
                  Cinematic Videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-gold-400 pl-2">
              ENGAGE
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/events" className="hover:text-gold-400 transition-colors">
                  Events & Fest
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-gold-400 transition-colors">
                  Campus Stories
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-gold-400 transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-gold-400 font-semibold hover:underline flex items-center gap-1">
                  <span>Join The Club</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-4 border-l-2 border-gold-400 pl-2">
              CONTACT
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  Sreyas Institute of Engineering and Technology, Nagole, Hyderabad, Telangana 500068
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:mediaclub@sreyas.ac.in" className="text-xs hover:text-gold-400 transition-colors">
                  mediaclub@sreyas.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Sreyas Media Club. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span>Telling Stories. Building Impact.</span>
            <span>One Club. Many Voices.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
