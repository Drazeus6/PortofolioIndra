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

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter.'),
  email: z.string().email('Format email tidak valid (contoh: nama@perusahaan.com).'),
  subject: z.string().min(3, 'Subjek minimal 3 karakter.'),
  message: z.string().min(10, 'Pesan minimal 10 karakter.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { viewMode } = useViewMode();
  const isDev = viewMode === 'developer';
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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
        throw new Error(resData.error || 'Gagal mengirim pesan.');
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'Terjadi kesalahan sistem.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-base text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 font-sans">
          <Badge variant={isDev ? 'blue' : 'amber'}>Mari Terhubung</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Hubungi <span className={`font-mono ${isDev ? 'text-blue-400' : 'text-amber-400'}`}>{PERSONAL_DATA.name}</span>
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-3 max-w-xl mx-auto font-mono">
            Terbuka untuk peluang karir di bidang peradilan, Fullstack Web Development, Legal-Tech, legal officer, atau riset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-mono">
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-md bg-dark-surface border border-dark-border shadow-xl">
              <h3 className="font-extrabold text-lg mb-6 text-white font-sans">Informasi Kontak Direct</h3>
              <div className="space-y-6 text-xs">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-blue-950 border border-blue-800 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Email Resmi</span>
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
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Alamat / Lokasi</span>
                    <span className="font-bold text-slate-300">{PERSONAL_DATA.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-md bg-dark-surface border border-emerald-900/60 text-white shadow-xl">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                Respon Cepat via WhatsApp
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans font-light">
                Membutuhkan tanggapan cepat untuk wawancara kerja atau diskusi proyek? Klik di bawah untuk langsung terhubung.
              </p>
              <a
                href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}?text=Halo%20Indra%20Mulyana,%20saya%20tertarik%20berdiskusi%20mengenai%20peluang%20karir.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors uppercase tracking-wider"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* Right Side: Validated Form (Zod + Backend API) */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-md bg-dark-surface border border-dark-border shadow-xl">
              <h3 className="font-extrabold text-xl mb-6 text-white font-sans">Formulir Kontak (Server Validation)</h3>

              {serverError && (
                <div className="mb-6 p-4 rounded-sm bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{serverError}</span>
                </div>
              )}

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-sm bg-dark-base border border-emerald-800 text-emerald-300">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="font-bold text-base font-sans">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs text-slate-300 font-sans font-light">
                    Terima kasih telah menghubungi Indra Mulyana. Pesan Anda telah diterima backend dan akan dibalas secepatnya.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs">
                  <div>
                    <label className="block text-xs uppercase font-bold mb-1 text-slate-300">Nama Lengkap *</label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold mb-1 text-slate-300">Email Kontak *</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="nama@perusahaan.com"
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold mb-1 text-slate-300">Subjek *</label>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="Contoh: Tawaran Perkerjaan / Konsultasi Legal-Tech"
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    {errors.subject && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold mb-1 text-slate-300">Pesan *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tuliskan rincian pesan atau tawaran Anda..."
                      className="w-full bg-dark-card border border-dark-border rounded-sm px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 placeholder:text-slate-500 resize-none"
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant={isDev ? 'dev' : 'legal'}
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? 'Mengirim Backend...' : 'Kirim Pesan (Verify Backend)'}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
