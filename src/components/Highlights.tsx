import React from 'react';
import { Users, Gamepad2, Car, ShieldCheck, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HighlightsProps {
  language: 'ar' | 'en';
  onOpenReservation: () => void;
  onNavigate?: (pageId: string) => void;
}

export const Highlights: React.FC<HighlightsProps> = ({ language, onOpenReservation, onNavigate }) => {
  const isAr = language === 'ar';

  return (
    <section className="py-16 bg-[#11141a] border-b border-[#1f2633]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-right">
          <div>
            <div className="text-xs font-bold text-[#e4a74e] tracking-wider mb-2">
              {isAr ? 'تجربة ضيافة متكاملة' : 'Signature Hospitality Experience'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'خصوصية عائلية ومرافق مصممة لراحتكم' : 'Family Privacy & Tailored Amenities'}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {isAr
              ? 'صممنا مطعم الطيب بالفيوم ليلبي جميع المناسبات: غرف VIP خاصة للعائلات والشركات، ودور ألعاب للأطفال، وخدمات سريعة للسيارات.'
              : 'Engineered to host every occasion: private VIP dining suites, supervised kids zone, and rapid car pickup.'}
          </p>
        </div>

        {/* 3 Pillars Grid (Clean, zero-photo, elegant architectural cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-right">
          {/* Pillar 1: VIP Private Rooms */}
          <div className="bg-[#151922] p-7 rounded-2xl border border-[#252e3d] flex flex-col justify-between hover:border-[#3a475c] transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#e4a74e]/10 border border-[#e4a74e]/20 text-[#e4a74e] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                {isAr ? 'غرف خاصة VIP للمجموعات وغداء العمل' : 'Private VIP Suites & Business Dining'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isAr
                  ? 'قاعات وغرف مستقلة مجهزة بأعلى مستوى من الراحة والتكييف، مخصصة لعزومات العائلات والمجموعات الكبيرة واجتماعات غداء العمل مع طاقم خدمة خاص.'
                  : 'Independent, fully air-conditioned private rooms designed for family gatherings, business luncheons, and large group banquets with dedicated service.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between">
              <button
                onClick={() => onNavigate ? onNavigate('booking') : onOpenReservation()}
                className="text-xs font-bold text-[#e4a74e] hover:text-[#f0be65] transition-colors"
              >
                {isAr ? 'صفحة حجز غرف الـ VIP ←' : 'VIP Reservation Page →'}
              </button>
              <span className="text-[11px] text-zinc-500">
                {isAr ? 'برج عزوز - الفيوم' : 'Azzouz Tower'}
              </span>
            </div>
          </div>

          {/* Pillar 2: Upper floor Kids Fun Zone */}
          <div className="bg-[#151922] p-7 rounded-2xl border border-[#252e3d] flex flex-col justify-between hover:border-[#3a475c] transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                {isAr ? 'صالة ألعاب للأطفال (الدور العلوي)' : 'Upper Floor Kids Fun Zone'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isAr
                  ? 'مساحة ترفيهية متكاملة وآمنة للأطفال بإشراف موظفي استقبال، لكي تستمتع الأسرة بتناول الطعام في راحة وهدوء تام دون قلق على الصغار.'
                  : 'A dedicated and safe entertainment floor equipped with fun games and supervised play, letting parents dine in calm peace.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">
                {isAr ? '★ إشادة واسعة في تقييمات الزوار' : '★ Top rated by parents'}
              </span>
              <span className="text-[11px] text-emerald-400 font-bold">
                {isAr ? 'ألعاب آمنة 100%' : 'Safe Play'}
              </span>
            </div>
          </div>

          {/* Pillar 3: Fast Pickup & Parking */}
          <div className="bg-[#151922] p-7 rounded-2xl border border-[#252e3d] flex flex-col justify-between hover:border-[#3a475c] transition-all space-y-4">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                {isAr ? 'طلب أثناء القيادة وتسليم بدون تلامس' : 'Drive-thru, Takeout & Contactless Delivery'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {isAr
                  ? 'خدمة الاستلام بالسيارة مباشرة أمام برج عزوز بجوار مستشفى الحياة، أو التوصيل الحراري المغلق حتى باب بيتك في أنحاء الفيوم.'
                  : 'Car-side pickup directly in front of Azzouz Tower, or sealed insulated home delivery across the governorate.'}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">
                {isAr ? 'ركن سيارات مريح' : 'Easy Street Parking'}
              </span>
              <span className="text-[11px] text-[#e4a74e] font-bold">
                {isAr ? 'تغليف حراري ساخن' : 'Thermal Packed'}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RESTAURANT_INFO.services.slice(0, 4).map((service) => (
            <div
              key={service.id}
              className="bg-[#13171e] p-4 rounded-xl border border-[#202733] text-right flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#e4a74e] shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-200">
                {isAr ? service.name : service.nameEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
