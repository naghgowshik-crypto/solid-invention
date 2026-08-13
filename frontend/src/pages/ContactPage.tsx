import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactFormState } from '../types/models';
import { apiSubmitContact } from '../api/client';
import { MapPin, Mail, Phone, Instagram, Youtube, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      await apiSubmitContact(formData);
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <SectionHeading
          badge="GET IN TOUCH"
          title="CONNECT WITH MEDIA CLUB"
          subtitle="Have a project idea, press inquiry, event coverage request, or general question? We would love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info & Campus Location */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 glass-panel rounded-3xl border border-amber-500/20 space-y-6">
              <h3 className="text-2xl font-bold font-heading text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-100">Location</p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Sreyas Institute of Engineering and Technology, Bandlaguda, Nagole, Hyderabad, Telangana 500068
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-100">Email Us</p>
                    <a href="mailto:naghgowshik@gmail.com" className="text-xs text-gold-400 hover:underline">
                      naghgowshik@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-slate-100">Official Queries</p>
                    <p className="text-xs text-slate-400">+91 9491867625</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-amber-500/15">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  Follow Our Official Channels
                </p>
                <div className="flex items-center space-x-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-flame-400 hover:border-flame-400 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-navy-900 border border-amber-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="p-6 glass-panel rounded-3xl border border-amber-500/20 relative overflow-hidden h-48 flex flex-col justify-end">
              <div className="absolute inset-0 bg-navy-900/90 flex items-center justify-center p-4 text-center">
                <div className="space-y-1">
                  <MapPin className="w-8 h-8 text-gold-400 mx-auto" />
                  <p className="font-bold text-sm text-slate-100">SREYAS INSTITUTIONAL CAMPUS</p>
                  <p className="text-xs text-slate-400">Media Studio Block B, Room 204</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 md:p-14 glass-panel rounded-3xl border-2 border-gold-500/40 shadow-gold-glow text-center space-y-6">
                <CheckCircle className="w-16 h-16 text-gold-400 mx-auto" />
                <h3 className="text-2xl font-bold font-heading text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-300">
                  Thank you, <span className="font-bold text-white">{formData.name}</span>. We have saved your message regarding "{formData.subject || 'Media Club Inquiry'}" in our database and will respond shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-navy-950 bg-gold-400 hover:bg-gold-300 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 glass-panel rounded-3xl border border-amber-500/20 shadow-2xl space-y-6">
                <h3 className="text-2xl font-bold font-heading text-slate-100 mb-4">
                  Send Us a Direct Message
                </h3>

                {serverError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-red-300 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Submission Failed</p>
                      <p className="text-xs text-red-400 mt-0.5">{serverError}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Event Media Coverage Request"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your message or inquiry here..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-extrabold uppercase tracking-wider text-sm shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>SAVING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
