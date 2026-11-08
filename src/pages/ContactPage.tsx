import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('acquisition');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all contact fields', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Concierge inquiry dispatched successfully', 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: 'Client Services' }]} className="mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact details & Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500 block mb-2">
              Private Concierge
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tracking-tight">
              Direct Atelier Liaison
            </h1>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              Whether arranging a private gallery viewing in Milan or inquiring about serialized calibration certificates, our master curators are at your disposal.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start gap-3.5 shadow-xs">
              <Mail className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">General & Order Concierge</span>
                <a href="mailto:concierge@kroma-atelier.com" className="text-stone-600 hover:text-stone-900 underline mt-0.5 block">
                  concierge@kroma-atelier.com
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start gap-3.5 shadow-xs">
              <Phone className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">Atelier Telephone Hotline</span>
                <span className="text-stone-600 mt-0.5 block">+39 02 8934 9100 (Central Europe)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start gap-3.5 shadow-xs">
              <Clock className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">Concierge Hours</span>
                <span className="text-stone-600 mt-0.5 block">
                  Monday – Friday: 08:00 – 20:00 CET<br />
                  Saturday: 10:00 – 17:00 CET
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-xs">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold font-display text-stone-900">Inquiry Received</h2>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. A dedicated senior curator has been assigned to your message and will respond within 4 business hours to <strong>{email}</strong>.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-lg font-bold font-display text-stone-900 pb-3 border-b border-stone-100">
                Transmit a Private Inquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Julian Vance"
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Subject of Inquiry
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="acquisition">Private Piece Acquisition / Availability</option>
                  <option value="showroom">Showroom Consultation (Milan / Tokyo / Copenhagen)</option>
                  <option value="custom">Bespoke Architectural Commission</option>
                  <option value="service">Existing Order Support & Calibration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your inquiry, project dimensions, or specific curation of interest..."
                  className="w-full text-xs bg-white border border-stone-200 rounded-xl p-3.5 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Submit to Concierge
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
