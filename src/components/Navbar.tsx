import React, { useState } from 'react';
import { Phone, ShoppingBag, Calendar, Menu, X, UtensilsCrossed } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  activePage: string;
  onSelectPage: (page: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAdmin: () => void;
  dailySpecial?: string;
  language: 'ar' | 'en';
  onToggleLanguage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onSelectPage,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenAdmin,
  dailySpecial,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);

  const isAr = language === 'ar';

  const handleLogoSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = logoClickCount + 1;
    setLogoClickCount(nextCount);
    if (nextCount >= 3) {
      setLogoClickCount(0);
      onOpenAdmin();
    }
    setTimeout(() => setLogoClickCount(0), 1200);
  };

  const navLinks = [
    { id: 'home', label: isAr ? 'الرئيسية' : 'Home' },
    { id: 'menu', label: isAr ? 'قائمة الطعام' : 'Menu' },
    { id: 'booking', label: isAr ? 'حجز طاولة & VIP' : 'Reserve & VIP' },
    { id: 'peak-hours', label: isAr ? 'أوقات الزحمة' : 'Peak Hours' },
    { id: 'reviews', label: isAr ? 'تعليقات الزبائن' : 'Reviews' },
    { id: 'location', label: isAr ? 'الموقع والتواصل' : 'Location' },
  ];

  const handlePageClick = (pageId: string) => {
    onSelectPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Daily Special Announcement from Admin if active */}
      {dailySpecial && (
        <div className="bg-gradient-to-r from-[#96631b] via-[#c68e3f] to-[#96631b] text-zinc-950 px-4 py-2 text-center text-xs font-black shadow-md flex items-center justify-center gap-2">
          <span>🔥</span>
          <span>{dailySpecial}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#0d0f12]/95 backdrop-blur-md border-b border-[#232a35] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Directs to Home page) */}
          <div
            onClick={() => handlePageClick('home')}
            onDoubleClick={handleLogoSecretClick}
            className="flex items-center gap-3 text-white font-bold tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group cursor-pointer select-none"
            title={isAr ? 'مطعم الطيب بالفيوم (انقر للرئيسية)' : 'El-Tayeb Restaurant'}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c68e3f] to-[#8d5b1b] flex items-center justify-center text-white shadow-md shadow-[#c68e3f]/20">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl font-extrabold text-[#f3f4f6] font-['Cairo'] group-hover:text-[#e4a74e] transition-colors">
                {isAr ? RESTAURANT_INFO.name : RESTAURANT_INFO.nameEn}
              </span>
              <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
                {isAr ? 'الفيوم · مأكولات مصرية ومشويات' : 'Fayoum · Egyptian Cuisine'}
              </span>
            </div>
          </div>

          {/* Zone 2: Dedicated Page Tabs (Each item has its own separate page) */}
          <nav className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-zinc-300">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handlePageClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all whitespace-nowrap shrink-0 text-xs sm:text-sm font-bold ${
                    isActive
                      ? 'bg-[#e4a74e] text-zinc-950 font-black shadow-md shadow-[#e4a74e]/20'
                      : 'text-zinc-300 hover:text-white hover:bg-[#1a212e]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Cart Counter */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleLanguage}
              className="text-xs font-semibold px-2.5 py-1.5 rounded text-zinc-400 hover:text-white border border-[#2c3543] hover:border-zinc-500 transition-colors whitespace-nowrap"
              title="تبديل اللغة / Toggle Language"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phoneClean}`}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-zinc-200 hover:text-white px-3 py-2 rounded-lg border border-[#2d3644] hover:bg-[#1a202c] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#e4a74e]" />
              <span className="tabular-nums" dir="ltr">{RESTAURANT_INFO.phone}</span>
            </a>

            <button
              onClick={() => handlePageClick('booking')}
              className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activePage === 'booking'
                  ? 'bg-[#e4a74e] text-zinc-950 font-black'
                  : 'text-white bg-[#1e2530] hover:bg-[#283241] border border-[#343e50]'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${activePage === 'booking' ? 'text-zinc-950' : 'text-[#e4a74e]'}`} />
              <span>{isAr ? 'حجز VIP' : 'Book VIP'}</span>
            </button>

            <button
              onClick={onOpenCart}
              aria-label="سلة الطلبات"
              className="relative flex items-center justify-center p-2.5 bg-[#e4a74e] hover:bg-[#d09439] text-[#0d0f12] font-bold rounded-lg shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-600 text-white rounded-full text-[11px] font-extrabold flex items-center justify-center tabular-nums shadow">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg border border-[#2c3543]"
              aria-label="القائمة الجانبية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Page Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#12161d] border-b border-[#252c38] px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handlePageClick(link.id)}
                    className={`block w-full text-right px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#e4a74e] text-zinc-950 font-black'
                        : 'text-zinc-200 hover:text-[#e4a74e] hover:bg-[#1a202c]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-[#232b36] flex flex-col gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-zinc-900 bg-[#e4a74e] rounded-lg"
              >
                <Phone className="w-4 h-4 text-zinc-900" />
                <span>{isAr ? `اتصال مباشر: ${RESTAURANT_INFO.phone}` : `Call: ${RESTAURANT_INFO.phone}`}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
