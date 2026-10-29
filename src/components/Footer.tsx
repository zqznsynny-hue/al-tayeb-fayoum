import React from 'react';
import { UtensilsCrossed, Phone, MapPin, Clock, ArrowUp, Star, Lock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  language: 'ar' | 'en';
  activePage?: string;
  onSelectPage?: (page: string) => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  activePage,
  onSelectPage,
  onOpenReservation,
  onOpenAdmin,
}) => {
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0c0f] border-t border-[#1b212c] text-right text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c68e3f] to-[#8d5b1b] flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-['Cairo']">
                  {isAr ? RESTAURANT_INFO.name : RESTAURANT_INFO.nameEn}
                </span>
                <span className="block text-xs text-[#e4a74e] font-semibold">
                  {isAr ? 'الفيوم · مأكولات مصرية ومشويات على أصولها' : 'Fayoum · Prime Egyptian Barbecue'}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {isAr
                ? 'وجهتك الأولى في محافظة الفيوم لأشهى صواني المشويات البلدية، الطواجن الفخار، وغرف الـ VIP العائلية مع منطقة مخصصة لألعاب الأطفال.'
                : 'Your premiere destination in Fayoum for charcoal-grilled lamb chops, bubbling clay tagines, private VIP family suites, and a dedicated kids zone.'}
            </p>

            <div className="flex items-center gap-3 text-xs text-zinc-300">
              <span className="flex items-center gap-1 text-[#e4a74e] font-bold">
                <Star className="w-4 h-4 fill-[#e4a74e]" />
                <span className="tabular-nums">4.1</span>
              </span>
              <span>·</span>
              <span>341 {isAr ? 'مراجعة موثقة على جوجل ماب' : 'Google Reviews'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-['Cairo']">
              {isAr ? 'روابط سريعة' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectPage ? onSelectPage('menu') : window.location.hash = 'menu'}
                  className="hover:text-[#e4a74e] transition-colors text-right"
                >
                  {isAr ? 'قائمة الطعام والصواني الملكية' : 'Dining Menu & Royal Platters'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage ? onSelectPage('booking') : onOpenReservation()}
                  className="hover:text-[#e4a74e] transition-colors text-right"
                >
                  {isAr ? 'حجز طاولة أو غرفة خاصة VIP' : 'Reserve Table / VIP Room'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage ? onSelectPage('peak-hours') : window.location.hash = 'peak-hours'}
                  className="hover:text-[#e4a74e] transition-colors text-right"
                >
                  {isAr ? 'مواعيد العمل وأوقات الزحمة' : 'Peak Hours & Wait Times'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage ? onSelectPage('reviews') : window.location.hash = 'reviews'}
                  className="hover:text-[#e4a74e] transition-colors text-right"
                >
                  {isAr ? 'صفحة تعليقات ومراجعات الزبائن' : 'Customer Comments & Reviews'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectPage ? onSelectPage('location') : window.location.hash = 'location'}
                  className="hover:text-[#e4a74e] transition-colors text-right"
                >
                  {isAr ? 'خريطة الموقع برج عزوز' : 'Location & Directions'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white font-['Cairo']">
              {isAr ? 'التواصل والعنوان' : 'Contact & Hours'}
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e4a74e] shrink-0 mt-0.5" />
                <span>{isAr ? RESTAURANT_INFO.address : RESTAURANT_INFO.addressEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e4a74e] shrink-0" />
                <span>{isAr ? RESTAURANT_INFO.hoursDisplay : RESTAURANT_INFO.hoursDisplayEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e4a74e] shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phoneClean}`}
                  className="text-white hover:text-[#e4a74e] transition-colors font-mono tabular-nums text-sm font-bold"
                  dir="ltr"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#181e28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              © {new Date().getFullYear()} {isAr ? 'مطعم الطيب - الفيوم. جميع الحقوق محفوظة.' : 'El-Tayeb Restaurant Fayoum. All rights reserved.'}
            </span>
            <span className="text-zinc-700">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors text-[11px]"
              title={isAr ? 'دخول إدارة المطعم ونشر الأكلات' : 'Staff Portal'}
            >
              <Lock className="w-3 h-3" />
              <span>{isAr ? 'لوحة المطعم' : 'Staff Portal'}</span>
            </button>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>{isAr ? 'العودة للأعلى' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
