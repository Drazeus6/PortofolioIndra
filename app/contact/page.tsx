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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: ContactFormData) => {
    setSubmitted(true);
    reset();
  };

  return (
    <div
      className={`min-h-screen pt-28 pb-20 transition-colors duration-500 ${
        isDev ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant={isDev ? 'emerald' : 'blue'}>Mari Terhubung</Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold mt-3 tracking-tight">
            Hubungi <span className={isDev ? 'text-amber-400 font-mono' : 'text-blue-700'}>{PERSONAL_DATA.name}</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-3 max-w-xl mx-auto font-light">
            Terbuka untuk peluang karir di bidang peradilan, legal officer, administrasi kepatuhan, riset, atau konsultasi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 rounded-3xl border shadow-xl ${
                isDev ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-blue-100'
              }`}
            >
              <h3 className="font-extrabold text-xl mb-6">Informasi Kontak</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block">Email</span>
                    <a
                      href={`mailto:${PERSONAL_DATA.email}`}
                      className="font-medium text-sm hover:text-blue-400 transition-colors"
                    >
                      {PERSONAL_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block">WhatsApp</span>
                    <a
                      href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-sm hover:text-emerald-400 transition-colors"
                    >
                      {PERSONAL_DATA.formattedWhatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase block">Lokasi Dominan</span>
                    <span className="font-medium text-sm">{PERSONAL_DATA.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl">
              <h4 className="font-bold text-base mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                Respon Cepat via WhatsApp
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Membutuhkan tanggapan cepat untuk wawancara kerja atau diskusi proyek? Klik di bawah untuk langsung terhubung.
              </p>
              <a
                href={`https://wa.me/62${PERSONAL_DATA.whatsapp.slice(1)}?text=Halo%20Indra%20Mulyana,%20saya%20tertarik%20berdiskusi%20mengenai%20peluang%20karir.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
              >
                Chat WhatsApp Sekarang
              </a>
            </div>
          </div>

          {/* Right Side: Validated Form (Zod + React Hook Form) */}
          <div className="lg:col-span-7">
            <div
              className={`p-8 rounded-3xl border shadow-xl ${
                isDev ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <h3 className="font-extrabold text-2xl mb-6">Kirim Pesan (Validasi Real-Time)</h3>

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="font-bold text-lg">Pesan Berhasil Terkirim!</h4>
                  <p className="text-xs text-slate-300">
                    Terima kasih telah menghubungi Indra Mulyana. Pesan Anda telah diterima dan akan dibalas secepatnya.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Kirim Pesan Lain
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 text-slate-400">Nama Anda</label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/40 dark:bg-slate-950 border text-sm focus:outline-none ${
                          errors.name ? 'border-red-500' : 'border-slate-700/60 focus:border-blue-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 text-slate-400">Email Anda</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="nama@perusahaan.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/40 dark:bg-slate-950 border text-sm focus:outline-none ${
                          errors.email ? 'border-red-500' : 'border-slate-700/60 focus:border-blue-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-slate-400">Subjek</label>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="Peluang Karir / Legalisasi & Riset"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/40 dark:bg-slate-950 border text-sm focus:outline-none ${
                        errors.subject ? 'border-red-500' : 'border-slate-700/60 focus:border-blue-500'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-2 text-slate-400">Pesan</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tuliskan detail pesan Anda di sini (minimal 10 karakter)..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-800/40 dark:bg-slate-950 border text-sm focus:outline-none ${
                        errors.message ? 'border-red-500' : 'border-slate-700/60 focus:border-blue-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant={isDev ? 'dev' : 'primary'}
                    size="lg"
                    className="w-full gap-2"
                  >
                    <Send className="w-4 h-4" /> Kirim Pesan Terverifikasi
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
