'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useViewMode } from '@/context/ViewModeContext';
import { PERSONAL_DATA } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { InteractiveGlowBackground } from '@/components/ui/InteractiveGlowBackground';

import { useLanguage } from '@/context/LanguageContext';
import { UI_TRANSLATIONS } from '@/lib/i18n';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter / Name min 2 chars.'),
  email: z.string().email('Format email tidak valid (nama@perusahaan.com).'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter / Subject min 3 chars.'),
  message: z.string().min(10, 'Pesan minimal 10 karakter / Message min 10 chars.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { viewMode } = useViewMode();
  const { language } = useLanguage();
  const isDev = viewMode === 'developer';
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const contactSchema = z.object({
    name: z.string().min(2, language === 'id' ? 'Nama minimal 2 karakter.' : 'Name must be at least 2 characters.'),
    email: z.string().email(language === 'id' ? 'Format email tidak valid (nama@perusahaan.com).' : 'Invalid email format (name@company.com).'),
    subject: z.string().min(3, language === 'id' ? 'Subjek minimal 3 karakter.' : 'Subject must be at least 3 characters.'),
    message: z.string().min(10, language === 'id' ? 'Pesan minimal 10 karakter.' : 'Message must be at least 10 characters.'),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || (language === 'id' ? 'Gagal mengirim pesan.' : 'Failed to send message.'));
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || (language === 'id' ? 'Terjadi kesalahan sistem.' : 'A system error occurred.'));
    }
  };

  return (
    <InteractiveGlowBackground className="min-h-screen pt-28 pb-20 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 font-sans">
          <Badge variant={isDev ? 'blue' : 'amber'}>{UI_TRANSLATIONS.contact.badge[language]}</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            {UI_TRANSLATIONS.contact.titlePrefix[language]} <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>{PERSONAL_DATA.name}</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
            {UI_TRANSLATIONS.contact.sub[language]}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-mono">
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-md bg-dark-surface border border-dark-border shadow-xl">
              <h3 className="font-extrabold text-lg mb-6 text-white font-sans">
                {language === 'id' ? 'Informasi Kontak Direct' : 'Direct Contact Info'}
              </h3>
              <div className="space-y-6 text-xs">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'id' ? 'Email Resmi' : 'Official Email'}
                    </span>
                    <a
                      href={`mailto:${PERSONAL_DATA.email}`}
                      className="font-bold text-slate-200 hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">WhatsApp</span>
                    <a
                      href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-slate-200 hover:text-amber-400 transition-colors"
                    >
                      {PERSONAL_DATA.formattedWhatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-dark-card border border-dark-border text-slate-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {language === 'id' ? 'Alamat / Lokasi' : 'Address / Location'}
                    </span>
                    <span className="font-bold text-slate-300">
                      {language === 'id' ? PERSONAL_DATA.location : 'Bandung / Ciamis, West Java, Indonesia'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-md bg-dark-surface border border-emerald-900/60 text-white shadow-xl">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                {language === 'id' ? 'Respon Cepat via WhatsApp' : 'Fast Response via WhatsApp'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans font-light">
                {language === 'id'
                  ? 'Membutuhkan tanggapan cepat untuk wawancara kerja atau diskusi proyek? Klik di bawah untuk langsung terhubung.'
                  : 'Need a quick response for job interviews or project discussions? Click below to connect instantly.'}
              </p>
              <a
                href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}?text=${encodeURIComponent(
                  language === 'id'
                    ? 'Halo Indra Mulyana, saya tertarik berdiskusi mengenai peluang karir.'
                    : 'Hello Indra Mulyana, I would like to connect regarding a career opportunity.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors uppercase tracking-wider"
              >
                {language === 'id' ? 'Chat WhatsApp Sekarang' : 'Chat via WhatsApp Now'}
              </a>
            </div>
          </div>

          {/* Right Side: Validated Form (Zod + Backend API) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-md bg-dark-surface border border-dark-border shadow-xl">
              <h3 className="font-extrabold text-xl mb-6 text-white font-sans">
                {language === 'id' ? 'Formulir Kontak (Server Validation)' : 'Contact Form (Server Validation)'}
              </h3>

              {serverError && (
                <div className="mb-6 p-4 rounded-sm bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{serverError}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-sm bg-dark-base border border-emerald-800 text-emerald-300">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="font-bold text-base font-sans">
                    {language === 'id' ? 'Pesan Berhasil Terkirim!' : 'Message Sent Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-300 font-sans font-light">
                    {language === 'id'
                      ? 'Terima kasih telah menghubungi Indra Mulyana. Pesan Anda telah diterima backend dan akan dibalas secepatnya.'
                      : 'Thank you for reaching out to Indra Mulyana. Your message has been received by the backend and will be answered promptly.'}
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    {language === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase font-bold mb-1 text-slate-300">{UI_TRANSLATIONS.contact.formName[language]}</label>
                    <input
                      {...register('name')}
                      id="contact-name"
                      type="text"
                      placeholder={language === 'id' ? 'Masukkan nama Anda...' : 'Enter your name...'}
                      aria-label="Nama lengkap Anda"
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      aria-invalid={!!errors.name}
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase font-bold mb-1 text-slate-300">{UI_TRANSLATIONS.contact.formEmail[language]}</label>
                    <input
                      {...register('email')}
                      id="contact-email"
                      type="email"
                      placeholder="name@company.com"
                      aria-label="Alamat email Anda"
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      aria-invalid={!!errors.email}
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase font-bold mb-1 text-slate-300">{UI_TRANSLATIONS.contact.formSubject[language]}</label>
                    <input
                      {...register('subject')}
                      id="contact-subject"
                      type="text"
                      placeholder={language === 'id' ? 'Contoh: Tawaran Pekerjaan / Konsultasi Legal-Tech' : 'e.g. Job Opportunity / Legal-Tech Consulting'}
                      aria-label="Subjek atau topik pesan"
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      aria-invalid={!!errors.subject}
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase font-bold mb-1 text-slate-300">{UI_TRANSLATIONS.contact.formMessage[language]}</label>
                    <textarea
                      {...register('message')}
                      id="contact-message"
                      rows={5}
                      placeholder={language === 'id' ? 'Tuliskan rincian pesan atau tawaran Anda...' : 'Write down your message details or opportunity...'}
                      aria-label="Isi pesan yang ingin Anda sampaikan"
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      aria-invalid={!!errors.message}
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500 resize-none"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-[11px] text-red-400 mt-1 flex items-center gap-1" role="alert">
                        <AlertCircle className="w-3 h-3" /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant={isDev ? 'dev' : 'legal'}
                    size="lg"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? 'Mengirim pesan, harap tunggu...' : 'Kirim pesan ke Indra Mulyana'}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? UI_TRANSLATIONS.contact.formSubmitting[language] : UI_TRANSLATIONS.contact.formSubmit[language]}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </InteractiveGlowBackground>
  );
}
