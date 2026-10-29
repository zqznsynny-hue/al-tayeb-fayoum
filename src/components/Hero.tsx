import React from 'react';
import { Star, MapPin, Clock, ArrowLeft, ArrowRight, ShieldCheck, Flame, Users, Sparkles, CheckCircle2, Phone, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  language: 'ar' | 'en';
  onNavigate?: (pageId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation, language, onNavigate }) => {
  const isAr = language === 'ar';

  return (
    <section className="relative overflow-hidden bg-[#0d0f12] pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#1f2633]">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#c68e3f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#c68e3f]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6 text-right">
            {/* Unboxed Metadata Header */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-zinc-400">
              <span className="flex items-center gap-1 text-[#e4a74e]">
                <Star className="w-4 h-4 fill-[#e4a74e] text-[#e4a74e]" />
                <strong className="text-white text-sm font-bold tabular-nums">4.1</strong>
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">
                {isAr ? '341 مراجعة معتمدة' : '341 Google Reviews'}
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300 tabular-nums">
                {isAr ? '200–1,000 ج.م للفرد' : '200–1,000 EGP per person'}
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {isAr ? 'مفتوح حتى 3:00 ص' : 'Open until 3:00 AM'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.25] text-balance font-['Cairo']">
              {isAr ? (
                <>
                  أصالة المأكولات المصرية <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0be65] via-[#e4a74e] to-[#b37c2a]">
                    والمشويات على أصولها
                  </span>{' '}
                  في قلب الفيوم
                </>
              ) : (
                <>
                  Authentic Egyptian Flavors & <br />
                  <span className="text-[#e4a74e]">Charcoal Grills</span> in Fayoum
                </>
              )}
            </h1>

            {/* Description without Arabian floor seating */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
              {isAr
                ? 'نقدم لكم أشهى مشويات اللحم البلدي الطازج، ريش ضاني، طواجن فخار عكاوي وبامية، وصواني الطيب الملكية. استمتع بأجواء عائلية راقية مع غرف VIP خاصة مستقلة ودور كامل مخصص لألعاب الأطفال.'
                : 'Experience premier Egyptian barbecue, lamb chops, sizzling earthenware clay tagines, and generous family banquet platters. Enjoy VIP private suites, executive hospitality, and an entertainment play floor for kids.'}
            </p>

            {/* Address bar */}
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 bg-[#141820] p-3.5 rounded-xl border border-[#242c3b]">
              <MapPin className="w-5 h-5 text-[#e4a74e] shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-semibold">
                  {isAr ? 'موقعنا في الفيوم: ' : 'Address: '}
                </span>
                <span>
                  {isAr ? RESTAURANT_INFO.address : RESTAURANT_INFO.addressEn}
                </span>
                <span className="block text-zinc-500 text-xs mt-0.5 font-mono">
                  Plus Code: {RESTAURANT_INFO.plusCode} · {isAr ? 'سهولة تامة لركن السيارات' : 'Convenient street parking'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate ? onNavigate('menu') : window.location.hash = 'menu'}
                className="px-6 py-3.5 text-sm font-bold text-zinc-950 bg-gradient-to-r from-[#e4a74e] to-[#c68e3f] hover:from-[#f0be65] hover:to-[#d09439] rounded-xl shadow-lg shadow-[#c68e3f]/20 transition-all flex items-center gap-2 group whitespace-nowrap shrink-0 active:scale-95"
              >
                <span>{isAr ? 'تصفح صفحة قائمة الطعام' : 'Explore Menu Page'}</span>
                {isAr ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('booking') : onOpenReservation()}
                className="px-5 py-3.5 text-sm font-bold text-white bg-[#1a212c] hover:bg-[#252e3e] border border-[#2e394b] rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95"
              >
                <Users className="w-4 h-4 text-[#e4a74e]" />
                <span>{isAr ? 'حجز طاولة أو غرفة VIP' : 'Reserve Table / VIP'}</span>
              </button>

              <button
                onClick={() => onNavigate ? onNavigate('location') : window.location.hash = 'location'}
                className="px-4 py-3.5 text-xs sm:text-sm font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>{isAr ? 'صفحة الموقع والخريطة' : 'Location & Directions'}</span>
              </button>
            </div>
          </div>

          {/* Clean Typographic & Feature Card (Replacing the photo) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#141820] rounded-2xl border border-[#273243] p-6 text-right space-y-5 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#212836]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#e4a74e]/10 border border-[#e4a74e]/20 text-[#e4a74e] flex items-center justify-center">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-['Cairo']">
                      {isAr ? 'مطعم الطيب - الفيوم' : 'El-Tayeb Fayoum'}
                    </h3>
                    <div className="text-[11px] text-zinc-400">
                      {isAr ? 'مأكولات مصرية ومشويات' : 'Egyptian Barbecue'}
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-xs font-extrabold text-emerald-400 block">
                    {isAr ? 'مفتوح للطلبات' : 'Open Now'}
                  </span>
                  <span className="text-[11px] text-zinc-400 tabular-nums">
                    {isAr ? 'حتى 3:00 ص' : 'Till 3 AM'}
                  </span>
                </div>
              </div>

              {/* Core Features List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0f1218] border border-[#1f2633]">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'لحوم بلدية طازجة 100%' : '100% Fresh Baladi Meat'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isAr ? 'ذبح يومي وتتبيلات شرقية مميزة ع الفحم' : 'Daily butchered & char-grilled with signature spices'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0f1218] border border-[#1f2633]">
                  <Users className="w-5 h-5 text-[#e4a74e] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'غرف خاصة VIP مستقلة' : 'Private VIP Suites'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isAr ? 'خصوصية تامة للعائلات والمجموعات وغداء العمل' : 'Complete privacy for families and business dining'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#0f1218] border border-[#1f2633]">
                  <Utensils className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">
                      {isAr ? 'صالة ألعاب للأطفال بالدور العلوي' : 'Upper Floor Kids Zone'}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {isAr ? 'مكان آمن ومسلي للأطفال بإشراف طاقم استقبال' : 'Safe play zone supervised by friendly staff'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Booking / WhatsApp shortcut */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-zinc-400">
                  {isAr ? 'الطلبات والاستفسارات:' : 'Orders & inquiries:'}
                </span>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="font-bold text-[#e4a74e] hover:text-[#f0be65] font-mono tabular-nums flex items-center gap-1.5"
                  dir="ltr"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Bar */}
        <div className="mt-14 pt-8 border-t border-[#1d232e] grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums flex items-center gap-1">
              <span>4.1</span>
              <Star className="w-5 h-5 fill-[#e4a74e] text-[#e4a74e]" />
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isAr ? 'تقييم عام موثق' : 'Overall Google Rating'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              341+
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isAr ? 'مراجعة وتقييم من العملاء' : 'Verified Diner Reviews'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#e4a74e] tabular-nums">
              3:00 <span className="text-sm font-semibold text-zinc-300">{isAr ? 'فجراً' : 'AM'}</span>
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isAr ? 'إغلاق المطعم يومياً' : 'Open Daily Till Late'}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              VIP & ألعاب
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {isAr ? 'غرف خاصة + ألعاب أطفال' : 'Private Suites + Kids Zone'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
