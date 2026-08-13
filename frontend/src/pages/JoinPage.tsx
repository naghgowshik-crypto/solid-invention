import React, { useState } from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionHeading } from '../components/ui/SectionHeading';
import { RecruitmentFormState } from '../types/models';
import { apiSubmitApplication } from '../api/client';
import { CheckCircle, Send, UserPlus, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const PREFERRED_TEAMS = [
  'Photography',
  'Videography',
  'Film Making',
  'Editing',
  'Graphic Design',
  'Anchoring',
  'Social Media',
  'PR & Outreach',
  'Event Management',
];

const SKILL_OPTIONS = [
  'DSLR / Mirrorless Camera Operation',
  'Adobe Premiere Pro / DaVinci Resolve',
  'Adobe Lightroom / Photoshop',
  'Scriptwriting & Storyboarding',
  'Stage Anchoring & Public Speaking',
  'Social Media Strategy & Reels',
  'Graphic Design & Poster Art',
  'Drone Piloting & Aerial Filming',
  'Sound Design & Audio Engineering',
];

export const JoinPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RecruitmentFormState>({
    fullName: '',
    rollNumber: '',
    branch: 'CSE',
    year: '1st Year',
    section: 'A',
    email: '',
    phone: '',
    preferredTeam: 'Photography',
    skills: [],
    previousExperience: '',
    portfolioLink: '',
    whyJoin: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.rollNumber.trim()) errs.rollNumber = 'Roll Number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid Email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = 'Valid 10-digit Phone is required';
    if (!formData.whyJoin.trim()) errs.whyJoin = 'Please state why you want to join';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await apiSubmitApplication({
        fullName: formData.fullName,
        rollNumber: formData.rollNumber,
        branch: formData.branch,
        year: formData.year,
        section: formData.section,
        email: formData.email,
        phone: formData.phone,
        preferredTeam: formData.preferredTeam,
        skills: formData.skills.join(', '),
        previousExperience: formData.previousExperience,
        portfolioUrl: formData.portfolioLink,
        motivation: formData.whyJoin,
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setServerError(err.message || 'Something went wrong. Please check your inputs and try again.');
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeading
          badge="MEMBERSHIP RECRUITMENT 2026"
          title="JOIN THE SREYAS MEDIA CLUB"
          subtitle="Become part of the team that captures moments, turns stories into films, and shapes campus culture."
        />

        {submitted ? (
          <div className="p-10 md:p-14 glass-panel rounded-3xl border-2 border-gold-500/40 shadow-gold-glow text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center mx-auto text-gold-400">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold font-heading text-white">
                Application Received Successfully!
              </h3>
              <p className="text-base text-gold-400 font-semibold">
                Welcome to the frame, {formData.fullName}.
              </p>
            </div>

            <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Your application has been persisted and registered for the <span className="font-bold text-white">{formData.preferredTeam}</span> team. We will get in touch with you soon at <span className="text-gold-400 font-mono">{formData.email}</span>.
            </p>

            <div className="pt-4 border-t border-amber-500/15 flex justify-center">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    rollNumber: '',
                    branch: 'CSE',
                    year: '1st Year',
                    section: 'A',
                    email: '',
                    phone: '',
                    preferredTeam: 'Photography',
                    skills: [],
                    previousExperience: '',
                    portfolioLink: '',
                    whyJoin: '',
                  });
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-navy-950 bg-gold-400 hover:bg-gold-300 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 md:p-12 glass-panel rounded-3xl border border-amber-500/20 shadow-2xl space-y-8">
            {serverError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start space-x-3 text-red-300 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="text-xs text-red-400 mt-0.5">{serverError}</p>
                </div>
              </div>
            )}

            <div className="border-b border-amber-500/15 pb-4">
              <h3 className="text-xl font-bold font-heading text-slate-100 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gold-400" />
                <span>1. Personal & Academic Details</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. K. Sreyas Vardhan"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-navy-900 border ${
                    errors.fullName ? 'border-red-500' : 'border-amber-500/20'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm`}
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Roll Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 239N1A0501"
                  value={formData.rollNumber}
                  onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-navy-900 border ${
                    errors.rollNumber ? 'border-red-500' : 'border-amber-500/20'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm`}
                />
                {errors.rollNumber && <p className="text-xs text-red-400 mt-1">{errors.rollNumber}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Branch *
                </label>
                <select
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-gold-400 text-sm"
                >
                  <option value="CSE">CSE</option>
                  <option value="CSE (AI & ML)">CSE (AI & ML)</option>
                  <option value="CSE (Data Science)">CSE (Data Science)</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="IT">IT</option>
                  <option value="Civil Engg">Civil Engg</option>
                  <option value="Mechanical Engg">Mechanical Engg</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Year *
                  </label>
                  <select
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-gold-400 text-sm"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Section *
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={e => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-gold-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  College Email ID *
                </label>
                <input
                  type="email"
                  placeholder="name@sreyas.ac.in"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-navy-900 border ${
                    errors.email ? 'border-red-500' : 'border-amber-500/20'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-navy-900 border ${
                    errors.phone ? 'border-red-500' : 'border-amber-500/20'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm`}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Preferred Team & Skills */}
            <div className="border-t border-amber-500/15 pt-6 space-y-6">
              <div className="border-b border-amber-500/15 pb-4">
                <h3 className="text-xl font-bold font-heading text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span>2. Team & Skill Preferences</span>
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Preferred Primary Team *
                </label>
                <select
                  value={formData.preferredTeam}
                  onChange={e => setFormData({ ...formData, preferredTeam: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 focus:outline-none focus:border-gold-400 text-sm"
                >
                  {PREFERRED_TEAMS.map(team => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Select Relevant Skills (Check all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {SKILL_OPTIONS.map(skill => {
                    const isChecked = formData.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-gold-500/20 border border-gold-400 text-gold-300'
                            : 'bg-navy-900 border border-amber-500/15 text-slate-400 hover:border-amber-500/30'
                        }`}
                      >
                        <span>{skill}</span>
                        {isChecked && <CheckCircle className="w-4 h-4 text-gold-400 ml-1 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Experience & Portfolio */}
            <div className="border-t border-amber-500/15 pt-6 space-y-6">
              <div className="border-b border-amber-500/15 pb-4">
                <h3 className="text-xl font-bold font-heading text-slate-100">
                  3. Portfolio & Statement
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Portfolio / Instagram Handle / Google Drive Link (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/yourhandle or Drive Link"
                  value={formData.portfolioLink}
                  onChange={e => setFormData({ ...formData, portfolioLink: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Previous Media/Creative Experience
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe any past photography, editing, school magazine, or event experience..."
                  value={formData.previousExperience}
                  onChange={e => setFormData({ ...formData, previousExperience: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-navy-900 border border-amber-500/20 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Why do you want to join Sreyas Media Club? *
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what drives your creative passion and what you hope to contribute..."
                  value={formData.whyJoin}
                  onChange={e => setFormData({ ...formData, whyJoin: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-navy-900 border ${
                    errors.whyJoin ? 'border-red-500' : 'border-amber-500/20'
                  } text-slate-100 placeholder-slate-500 focus:outline-none focus:border-gold-400 text-sm`}
                />
                {errors.whyJoin && <p className="text-xs text-red-400 mt-1">{errors.whyJoin}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-extrabold uppercase tracking-wider text-sm shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>PERSISTING TO BACKEND...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>SUBMIT APPLICATION</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </PageLayout>
  );
};
