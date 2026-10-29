import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check, Share2, Compass, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface LocationSectionProps {
  language: 'ar' | 'en';
}

export const LocationSection: React.FC<LocationSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const isAr = language === 'ar';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${RESTAURANT_INFO.name} - ${RESTAURANT_INFO.address} (Plus Code: ${RESTAURANT_INFO.plusCode})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: RESTAURANT_INFO.name,
        text: `${RESTAURANT_INFO.name} بالفيوم - مشويات وطواجن`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <section id="location" className="py-16 lg:py-24 bg-[#11141a] border-b border-[#1f2633] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-[#e4a74e] tracking-wider mb-2">
              {isAr ? 'العنوان وتحديد المسار' : 'Location & Directions'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'موقع مطعم الطيب بالفيوم' : 'Visit Us in Fayoum'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAddress}
              className="px-3.5 py-2 bg-[#171d27] hover:bg-[#202735] text-xs font-bold text-zinc-300 rounded-lg border border-[#27303f] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم نسخ العنوان' : 'Copied') : (isAr ? 'نسخ العنوان' : 'Copy Address')}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3.5 py-2 bg-[#171d27] hover:bg-[#202735] text-xs font-bold text-zinc-300 rounded-lg border border-[#27303f] flex items-center gap-1.5 transition-colors"
            >
              {shared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{shared ? (isAr ? 'تم نسخ الرابط' : 'Link Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Info Card & Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Detailed Info Card */}
          <div className="lg:col-span-6 bg-[#161a22] rounded-2xl border border-[#262f3e] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address Row */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#e4a74e]/10 border border-[#e4a74e]/20 text-[#e4a74e] flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 mb-1">
                    {isAr ? 'العنوان التفصيلي' : 'Address'}
                  </h3>
                  <p className="text-base font-bold text-white leading-relaxed">
                    {isAr ? RESTAURANT_INFO.address : RESTAURANT_INFO.addressEn}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-2 font-mono">
                    <span className="text-[#e4a74e] font-bold">Plus Code:</span>
                    <span>{RESTAURANT_INFO.plusCode}</span>
                    <span className="text-zinc-600">·</span>
                    <span>{isAr ? `الرمز البريدي: ${RESTAURANT_INFO.postalCode}` : `Postal: ${RESTAURANT_INFO.postalCode}`}</span>
                  </div>
                </div>
              </div>

              {/* Working Hours Row */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 mb-1">
                    {isAr ? 'مواعيد العمل' : 'Opening Hours'}
                  </h3>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 font-extrabold">{isAr ? 'مفتوح الآن' : 'Open Now'}</span>
                    <span>·</span>
                    <span className="tabular-nums">{isAr ? 'يغلق عند الساعة 3:00 ص' : 'Closes at 3:00 AM'}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {isAr ? 'نستقبلكم يومياً طوال الأسبوع من 11:00 صباحاً حتى 3:00 فجراً' : 'Daily service 11:00 AM to 3:00 AM'}
                  </p>
                </div>
              </div>

              {/* Phone & Direct Call Row */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-1">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 mb-1">
                    {isAr ? 'رقم الهاتف والطلبات السريعة' : 'Direct Phone & Orders'}
                  </h3>
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneClean}`}
                    className="text-lg font-black text-white hover:text-[#e4a74e] transition-colors tabular-nums font-['Plus_Jakarta_Sans']"
                    dir="ltr"
                  >
                    {RESTAURANT_INFO.phone}
                  </a>
                  <p className="text-xs text-zinc-400 mt-1">
                    {isAr ? 'خدمة الاستفسارات والحجز والطلبات عبر الهاتف والواتساب' : 'Available for inquiries, table reservations & delivery'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Direction CTA Button */}
            <div className="pt-6 border-t border-[#232b38] flex flex-wrap gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow"
              >
                <Navigation className="w-4 h-4" />
                <span>{isAr ? 'فتح الخريطة وتحديد الاتجاهات' : 'Open in Google Maps'}</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodeURIComponent('السلام عليكم، أود الاستفسار عن حجز طاولة أو طلب أوردر في مطعم الطيب بالفيوم.')}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-5 bg-[#1e2633] hover:bg-[#273244] text-white font-bold rounded-xl text-sm transition-colors border border-[#2d384b] flex items-center gap-2"
              >
                <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>

          {/* Interactive Visual Map Representation */}
          <div className="lg:col-span-6 bg-[#161a22] rounded-2xl border border-[#262f3e] overflow-hidden flex flex-col justify-between relative group">
            {/* Map Canvas Mockup */}
            <div className="relative h-72 sm:h-80 bg-[#12161e] p-6 flex flex-col justify-between overflow-hidden">
              {/* Subtle map grid vector lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3a4559_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400">
                <div className="bg-[#0d0f12]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#273142] flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#e4a74e]" />
                  <span>{isAr ? 'الفيوم · دله' : 'Fayoum · Dalla'}</span>
                </div>
                <div className="bg-[#0d0f12]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#273142] text-emerald-400 font-bold">
                  {isAr ? 'مستشفى الحياة · برج عزوز' : 'Al-Hayah Hospital Landmark'}
                </div>
              </div>

              {/* Center Location Pin */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <div className="relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#e4a74e]/20 animate-ping absolute" />
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#e4a74e] to-[#b37c2a] flex items-center justify-center text-zinc-950 shadow-2xl z-10">
                    <MapPin className="w-6 h-6 fill-zinc-950" />
                  </div>
                </div>
                <div className="mt-3 bg-[#0d0f12]/95 border border-[#e4a74e]/40 px-4 py-2 rounded-xl text-center shadow-xl">
                  <div className="text-sm font-extrabold text-white font-['Cairo']">
                    {RESTAURANT_INFO.name}
                  </div>
                  <div className="text-[11px] text-[#e4a74e] font-medium">
                    4.1 ★ (341 {isAr ? 'تقييم' : 'reviews'})
                  </div>
                </div>
              </div>

              {/* Bottom Road Badge */}
              <div className="relative z-10 bg-[#0d0f12]/80 backdrop-blur text-[11px] text-zinc-400 p-2.5 rounded-lg border border-[#202735] flex items-center justify-between">
                <span>{isAr ? 'شارع جمال عبد الناصر الرئيسي' : 'Gamal Abdel Nasser Main St.'}</span>
                <span className="text-emerald-400 font-bold">{isAr ? 'ركن سيارات متوفر' : 'Parking available'}</span>
              </div>
            </div>

            {/* Landmarks & Highlights strip */}
            <div className="p-5 bg-[#141820] border-t border-[#232b38] space-y-2 text-xs text-zinc-300">
              <div className="font-bold text-white mb-2">
                {isAr ? 'علامات مميزة بالقرب من المطعم:' : 'Key nearby landmarks:'}
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4a74e]" />
                  <span>{isAr ? 'مستشفى الحياة التخصصي (ملاصق)' : 'Al-Hayah Hospital (Adjacent)'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4a74e]" />
                  <span>{isAr ? 'برج عزوز السكني' : 'Azzouz Tower Building'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4a74e]" />
                  <span>{isAr ? 'ميدان دله ومحور عبد الناصر' : 'Dalla Square Corridor'}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4a74e]" />
                  <span>{isAr ? 'مواقف سيارات آمنة وفسيحة' : 'Spacious easy parking'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* "People also search for" Section directly from user prompt */}
        <div className="bg-[#141820] rounded-2xl border border-[#222a36] p-6 space-y-4">
          <div className="text-xs font-bold text-zinc-400">
            {isAr ? 'يبحث الأشخاص أيضًا عن (مطاعم مجاورة في الفيوم):' : 'People also search for (Nearby Fayoum Eateries):'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {RESTAURANT_INFO.nearbyPlaces.map((place) => (
              <div
                key={place.name}
                className="bg-[#0f1218] p-3.5 rounded-xl border border-[#1f2633] text-right space-y-1 hover:border-[#354154] transition-colors"
              >
                <div className="text-xs font-bold text-white truncate" title={place.name}>
                  {place.name}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#e4a74e]">
                  <span>{place.rating}</span>
                  <Star className="w-3 h-3 fill-[#e4a74e]" />
                  <span className="text-zinc-500 tabular-nums">({place.reviews})</span>
                </div>
                <div className="text-[10px] text-zinc-500">
                  {place.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
