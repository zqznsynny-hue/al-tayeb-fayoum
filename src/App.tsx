/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Highlights } from './components/Highlights';
import { MenuSection } from './components/MenuSection';
import { PeakHoursSection } from './components/PeakHoursSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { ReservationPage } from './components/ReservationPage';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { AddReviewModal } from './components/AddReviewModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';
import { MenuItem, ReviewItem, RESTAURANT_INFO, MENU_ITEMS } from './data/restaurantData';
import {
  Phone,
  MessageCircle,
  ShoppingBag,
  Utensils,
  Calendar,
  Clock,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Home,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [customReviews, setCustomReviews] = useState<ReviewItem[]>([]);

  // Page Routing State ('home' | 'menu' | 'booking' | 'peak-hours' | 'reviews' | 'location')
  const getInitialPage = (): string => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validPages = ['home', 'menu', 'booking', 'peak-hours', 'reviews', 'location'];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [activePage, setActivePage] = useState<string>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validPages = ['home', 'menu', 'booking', 'peak-hours', 'reviews', 'location'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [dailySpecial, setDailySpecial] = useState<string>(() => {
    return localStorage.getItem('tayeb_daily_special') || '';
  });

  // Dynamic Menu Items stored in localStorage
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('tayeb_custom_menu');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved menu', e);
    }
    return MENU_ITEMS;
  });

  // Secret keyboard shortcut (Ctrl + Shift + T) to open private room
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'T' || e.key === 't')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateDailySpecial = (msg: string) => {
    setDailySpecial(msg);
    localStorage.setItem('tayeb_daily_special', msg);
  };

  // Sync menuItems to localStorage
  const saveMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem('tayeb_custom_menu', JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving menu to localStorage', e);
    }
  };

  const handleAddMenuItem = (item: MenuItem) => {
    saveMenuItems([item, ...menuItems]);
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    const next = menuItems.map((it) => (it.id === updatedItem.id ? updatedItem : it));
    saveMenuItems(next);
  };

  const handleDeleteMenuItem = (id: string) => {
    const next = menuItems.filter((it) => it.id !== id);
    saveMenuItems(next);
  };

  const handleResetMenu = () => {
    localStorage.removeItem('tayeb_custom_menu');
    setMenuItems(MENU_ITEMS);
  };

  // Sync document direction and lang
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleAddToCart = (item: MenuItem, selectedWeight?: string, customPrice?: number) => {
    const finalPrice = customPrice !== undefined ? customPrice : item.price;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.id === item.id && ci.selectedWeight === selectedWeight
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          nameEn: item.nameEn,
          price: finalPrice,
          quantity: 1,
          selectedWeight,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setCustomReviews((prev) => [newRev, ...prev]);
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  const isAr = language === 'ar';

  const pageTitles: Record<string, { ar: string; en: string }> = {
    home: { ar: 'الصفحة الرئيسية', en: 'Home Page' },
    menu: { ar: 'قائمة الطعام والصواني الملكية', en: 'Food Menu & Platters' },
    booking: { ar: 'حجز طاولة & غرف خاصة VIP', en: 'Table & VIP Reservation' },
    'peak-hours': { ar: 'مواعيد العمل وأوقات الزحمة', en: 'Working Hours & Peak Times' },
    reviews: { ar: 'صفحة تعليقات ومراجعات الزبائن', en: 'Customer Reviews & Comments' },
    location: { ar: 'موقع المطعم والعنوان والاتجاهات', en: 'Location & Directions' },
  };

  return (
    <div className={`min-h-screen bg-[#0d0f12] text-[#f3f4f6] ${language === 'ar' ? "font-['Cairo']" : "font-['Plus_Jakarta_Sans']"}`}>
      {/* Top Navbar with Page Tabs */}
      <Navbar
        activePage={activePage}
        onSelectPage={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => handleNavigate('booking')}
        onOpenAdmin={() => setIsAdminOpen(true)}
        dailySpecial={dailySpecial}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Breadcrumb Navigation when on a sub-page */}
      {activePage !== 'home' && (
        <div className="bg-[#12161f] border-b border-[#202735] py-3 text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-zinc-400">
              <button
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-1 hover:text-[#e4a74e] transition-colors font-bold"
              >
                <Home className="w-3.5 h-3.5" />
                <span>{isAr ? 'الرئيسية' : 'Home'}</span>
              </button>
              <span>/</span>
              <span className="text-[#e4a74e] font-extrabold">
                {isAr ? pageTitles[activePage]?.ar : pageTitles[activePage]?.en}
              </span>
            </div>

            <button
              onClick={() => handleNavigate('home')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              {isAr ? (
                <>
                  <span>العودة للرئيسية</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Dedicated Page View Switcher */}
      <main>
        {/* 1. HOME PAGE */}
        {activePage === 'home' && (
          <>
            <Hero
              onOpenReservation={() => handleNavigate('booking')}
              language={language}
              onNavigate={handleNavigate}
            />

            <Highlights
              language={language}
              onOpenReservation={() => handleNavigate('booking')}
              onNavigate={handleNavigate}
            />

            {/* Quick Dedicated Pages Directory Hub */}
            <section className="py-16 bg-[#0f1218] border-b border-[#1f2633] text-right">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4a74e]/10 border border-[#e4a74e]/20 text-[#e4a74e] text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'أقسام وصفحات مطعم الطيب المخصصة' : 'Dedicated Sections & Pages'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cairo']">
                    {isAr ? 'تصفح كل قسم في صفحته المستقلة' : 'Explore Each Dedicated Page'}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {isAr
                      ? 'يمكنك التنقل بسهولة عبر الشريط العلوي أو من خلال البطاقات التالية للدخول لكل صفحة متخصصة:'
                      : 'Navigate effortlessly between dedicated pages via the top menu bar or direct page cards:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Page 1: Menu */}
                  <div className="bg-[#141822] p-6 rounded-2xl border border-[#232d3d] hover:border-[#e4a74e]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#e4a74e] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Utensils className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'صفحة قائمة الطعام والأسعار' : 'Menu & Prices Page'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'صواني الطيب الملكية، كباب وريش، طواجن فخار، ومشويات بالوزن بالجنيه المصري (ج.م) مع إمكانية عرض حتى 10 صور لكل أكلة وإضافتها لسلة الطلبات.'
                          : 'Charcoal grills, clay tagines, royal banquet platters priced in Egyptian Pounds (EGP) with up to 10 photos per dish.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => handleNavigate('menu')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1c2432] hover:bg-[#e4a74e] text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>{isAr ? 'فتح صفحة قائمة الطعام' : 'Open Menu Page'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Page 2: Booking VIP */}
                  <div className="bg-[#141822] p-6 rounded-2xl border border-[#232d3d] hover:border-[#e4a74e]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'صفحة حجز طاولة & غرف VIP' : 'Table & VIP Reservation'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'احجز غرف الـ VIP المستقلة للمجموعات الكبيرة وغداء العمل أو صالة العائلات مع استلام كود حجز فوري ورسالة واتساب تلقائية للمطعم.'
                          : 'Reserve private VIP suites and family tables with an instant booking voucher code and automated WhatsApp ticket.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => handleNavigate('booking')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1c2432] hover:bg-emerald-500 text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>{isAr ? 'فتح صفحة حجز VIP' : 'Open Reservation Page'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Page 3: Peak Hours */}
                  <div className="bg-[#141822] p-6 rounded-2xl border border-[#232d3d] hover:border-[#e4a74e]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'صفحة أوقات الزحمة والمواعيد' : 'Peak Hours & Wait Times'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'بيانات أوقات الزحمة المباشرة، والرسم البياني ليوم الخميس من 6 صباحاً حتى 12 منتصف الليل، وتأكيد العمل حتى 3:00 فجراً.'
                          : 'Live occupancy status, Thursday hourly rush bar chart, wait times, and open till 3:00 AM daily.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => handleNavigate('peak-hours')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1c2432] hover:bg-blue-500 text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>{isAr ? 'فتح صفحة أوقات الزحمة' : 'Open Peak Hours Page'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Page 4: Reviews & Customer Comments */}
                  <div className="bg-[#141822] p-6 rounded-2xl border border-[#232d3d] hover:border-[#e4a74e]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Star className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'صفحة تعليقات ومراجعات الزبائن' : 'Customer Reviews & Comments'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'مكان مخصص لنشر تعليقات وآراء الزبائن مباشرة، مع تفريغ تقييم جوجل 4.1 من 341 مراجعة وفلاتر التجربة والمكان والأطفال.'
                          : 'Dedicated space to write and read diner comments with Google 4.1 star breakdown, topic tabs, and like counters.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => handleNavigate('reviews')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1c2432] hover:bg-[#e4a74e] text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>{isAr ? 'فتح صفحة تعليقات الزبائن' : 'Open Reviews Page'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Page 5: Location & Contact */}
                  <div className="bg-[#141822] p-6 rounded-2xl border border-[#232d3d] hover:border-[#e4a74e]/50 transition-all flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'صفحة الموقع والخريطة والتواصل' : 'Location & Directions Page'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'العنوان الدقيق ببرج عزوز بجوار مستشفى الحياة، شارع جمال عبد الناصر بالفيوم، مع كود Plus Code 8VC5+R37 وأرقام الهاتف.'
                          : 'Full address at Azzouz Tower near Al-Hayah Hospital, Gamal Abdel Nasser St, Fayoum with Plus Code & phone.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => handleNavigate('location')}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#1c2432] hover:bg-purple-500 text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all flex items-center justify-between"
                      >
                        <span>{isAr ? 'فتح صفحة الموقع والتواصل' : 'Open Location Page'}</span>
                        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Admin Shortcut Card */}
                  <div className="bg-gradient-to-br from-[#181d28] to-[#12161f] p-6 rounded-2xl border border-[#2b3648] flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="text-xs font-bold text-[#e4a74e]">
                        {isAr ? 'لوحة إدارة المطعم ونشر الأكلات' : 'Staff Menu Publishing Portal'}
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Cairo']">
                        {isAr ? 'نشر وإدارة أكلات المطعم' : 'Publish & Manage Dishes'}
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {isAr
                          ? 'لوحة خاصة لإدارة المطعم محمية برمز سري لإضافة ونشر الأكلات، وتعديل الأسعار، وحذف الأطباق، ورفع حتى 10 صور عالية الجودة لكل أكلة.'
                          : 'Password-protected staff portal to publish new dishes, adjust prices, and upload up to 10 photos per dish.'}
                      </p>
                    </div>
                    <div className="pt-5 mt-4 border-t border-[#1d2532]">
                      <button
                        onClick={() => setIsAdminOpen(true)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#242e3f] hover:bg-[#e4a74e] text-zinc-200 hover:text-zinc-950 text-xs font-bold transition-all text-center"
                      >
                        {isAr ? 'دخول لوحة إدارة المطعم' : 'Open Staff Portal'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* 2. DEDICATED MENU PAGE */}
        {activePage === 'menu' && (
          <div className="animate-fadeIn">
            <MenuSection
              language={language}
              items={menuItems}
              onAddToCart={handleAddToCart}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />
          </div>
        )}

        {/* 3. DEDICATED RESERVATION & VIP PAGE */}
        {activePage === 'booking' && (
          <div className="animate-fadeIn">
            <ReservationPage language={language} />
          </div>
        )}

        {/* 4. DEDICATED PEAK HOURS PAGE */}
        {activePage === 'peak-hours' && (
          <div className="animate-fadeIn">
            <PeakHoursSection
              language={language}
              onOpenReservation={() => handleNavigate('booking')}
            />
          </div>
        )}

        {/* 5. DEDICATED REVIEWS & CUSTOMER COMMENTS PAGE */}
        {activePage === 'reviews' && (
          <div className="animate-fadeIn">
            <ReviewsSection
              language={language}
              isStandalonePage={true}
              onOpenAddReview={() => setIsAddReviewOpen(true)}
              customReviews={customReviews}
              onAddReview={handleAddReview}
            />
          </div>
        )}

        {/* 6. DEDICATED LOCATION & CONTACT PAGE */}
        {activePage === 'location' && (
          <div className="animate-fadeIn">
            <LocationSection language={language} />
          </div>
        )}
      </main>

      {/* Footer with Page Links and Staff Portal */}
      <Footer
        language={language}
        activePage={activePage}
        onSelectPage={handleNavigate}
        onOpenReservation={() => handleNavigate('booking')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        language={language}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        language={language}
      />

      <AddReviewModal
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        onSubmit={handleAddReview}
        language={language}
      />

      {/* Secret Password-Protected Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onAddMenuItem={handleAddMenuItem}
        onUpdateMenuItem={handleUpdateMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onResetMenu={handleResetMenu}
        language={language}
      />

      {/* Mobile Floating Quick Action Bar */}
      <div className="md:hidden fixed bottom-3 inset-x-3 z-30 flex items-center gap-2 bg-[#12161f]/95 backdrop-blur-md p-2 rounded-2xl border border-[#263141] shadow-2xl">
        <a
          href={`tel:${RESTAURANT_INFO.phoneClean}`}
          className="flex-1 py-2.5 px-3 bg-[#1c2432] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-[#2d3a4d]"
        >
          <Phone className="w-4 h-4 text-[#e4a74e]" />
          <span>{isAr ? 'اتصال مباشر' : 'Call'}</span>
        </a>

        <a
          href={`https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodeURIComponent('السلام عليكم، أود طلب أوردر أو الاستفسار من مطعم الطيب بالفيوم.')}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba5a] text-zinc-950 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 shadow"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
        </a>

        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="py-2.5 px-3 bg-[#e4a74e] text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="tabular-nums font-extrabold">{totalCartCount}</span>
          </button>
        )}
      </div>
    </div>
  );
}
