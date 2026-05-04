import React from "react";
import {
  Globe,
  Layout,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent blur-3xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Jasurbek Xizmatlari
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Professional darajada veb-sayt yaratish va premium domenlarni sotib
            olish bo'yicha ishonchli hamkoringiz.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://t.me/jasurrrrrbek"
              target="_blank"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-all px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-600/20"
            >
              <MessageCircle size={20} />
              Telegram orqali bog'lanish
            </a>
            <a
              href="tel:+998935960246"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all px-8 py-4 rounded-full font-bold"
            >
              <Phone size={20} />
              +998 93 596 02 46
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-slate-950/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Domain Service */}
            <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-blue-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Domen Sotib Olish</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Brendingiz uchun eng mos va esda qolarli domenlarni topish va
                rasmiylashtirishda yordam beramiz.
              </p>
              <ul className="space-y-3">
                {[
                  "Premium domenlar",
                  "Xavfsiz tranzaksiya",
                  "Brending maslahatlari",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle size={16} className="text-emerald-500" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Web Development */}
            <div className="group p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="text-emerald-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Sayt Yaratish</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Zamonaviy texnologiyalar asosida tezkor, xavfsiz va mobil
                qurilmalarga moslashuvchan veb-saytlar.
              </p>
              <ul className="space-y-3">
                {[
                  "Landing Page",
                  "Internet do'konlar",
                  "Ma'lumotlar bazasi bilan ishlash",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle size={16} className="text-emerald-500" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-12 px-6 text-center border-t border-slate-800">
        <p className="text-slate-500 text-sm mb-4">
          © {new Date().getFullYear()} Jasurbek. Barcha huquqlar himoyalangan.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://t.me/jasurrrrrbek"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Telegram
          </a>
          <a
            href="tel:+998935960246"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Aloqa
          </a>
        </div>
      </footer>
    </div>
  );
}
