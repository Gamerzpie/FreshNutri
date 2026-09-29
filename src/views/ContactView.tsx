import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Editorial Question',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to the FreshNutri editors.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <header className="border-b border-stone-200 pb-6">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-sans">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
          Contact FreshNutri Editorial & Test Kitchen
        </h1>
        <p className="mt-2 text-stone-600 text-sm max-w-xl">
          Have a recipe question, culinary suggestion, or press inquiry? Our editors and culinary nutritionists read every message.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Office Details */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-5 bg-white rounded-xl border border-stone-200 space-y-4 text-xs">
            <h3 className="font-serif text-base font-semibold text-stone-900">
              FreshNutri Headquarters
            </h3>

            <div className="flex items-start gap-3 text-stone-600">
              <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">Editorial Test Kitchen</span>
                <span>450 Culinary Boulevard, Suite 300</span>
                <span className="block">San Francisco, CA 94107</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-stone-600">
              <Mail className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">General Inquiries</span>
                <span>editorial@freshnutri.magazine</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-stone-600">
              <MessageSquare className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-800 block">Press & Syndication</span>
                <span>press@freshnutri.magazine</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
            <strong>Submitting Recipe Feedback?</strong> Please note the exact recipe title and your oven or cooktop type so our test kitchen team can best assist you.
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl font-semibold text-stone-900">
                Message Received!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you for contacting FreshNutri. A member of our editorial or test-kitchen team will review your inquiry and respond within 2 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Sarah Davis"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                >
                  <option value="Recipe Question">Recipe Question / Test Kitchen</option>
                  <option value="Editorial Question">Editorial Question / Nutrition Science</option>
                  <option value="Meal Plan Inquiry">7-Day Meal Plan Inquiry</option>
                  <option value="Press & Media">Press & Media Relations</option>
                  <option value="Corrections">Corrections & Errata</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with our recipes or dietary articles?"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
