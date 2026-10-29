import React, { useState } from 'react';
import { Search, Plus, Check, Flame, Sparkles, Filter, X, Lock, Images, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  language: 'ar' | 'en';
  items: MenuItem[];
  onAddToCart: (item: MenuItem, selectedWeight?: string, customPrice?: number) => void;
  onOpenAdmin: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ language, items, onAddToCart, onOpenAdmin }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [modalSelectedWeightIndex, setModalSelectedWeightIndex] = useState<number>(0);

  // Gallery Lightbox Modal State
  const [galleryItem, setGalleryItem] = useState<MenuItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  const isAr = language === 'ar';

  const categories = [
    { id: 'all', label: isAr ? 'جميع الأصناف' : 'All Dishes' },
    { id: 'platters', label: isAr ? 'صواني الطيب الملكية' : 'Royal Platters' },
    { id: 'grills', label: isAr ? 'مشويات ع الفحم' : 'Charcoal Grills' },
    { id: 'tagines', label: isAr ? 'طواجن فخار' : 'Clay Tagines' },
    { id: 'appetizers', label: isAr ? 'المحاشي والمقبلات' : 'Sides & Appetizers' },
    { id: 'desserts', label: isAr ? 'حلويات ومشروبات' : 'Desserts & Drinks' },
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === 'desserts' && (item.category === 'desserts' || item.category === 'drinks'));

    const searchTarget = `${item.name} ${item.nameEn} ${item.description} ${item.descriptionEn}`.toLowerCase();
    const matchesSearch = searchQuery.trim() === '' || searchTarget.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (item: MenuItem) => {
    if (item.weightOptions && item.weightOptions.length > 0) {
      setSelectedItemForModal(item);
      setModalSelectedWeightIndex(0);
      return;
    }
    onAddToCart(item);
    setAddedItemNotice(item.id);
    setTimeout(() => setAddedItemNotice(null), 1500);
  };

  const handleModalAdd = () => {
    if (!selectedItemForModal) return;
    const opt = selectedItemForModal.weightOptions?.[modalSelectedWeightIndex];
    if (opt) {
      onAddToCart(selectedItemForModal, opt.label, opt.price);
    } else {
      onAddToCart(selectedItemForModal);
    }
    setAddedItemNotice(selectedItemForModal.id);
    setSelectedItemForModal(null);
    setTimeout(() => setAddedItemNotice(null), 1500);
  };

  const openGallery = (item: MenuItem, initialIndex = 0) => {
    setGalleryItem(item);
    setActivePhotoIndex(initialIndex);
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-[#0d0f12] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-[#e4a74e] tracking-wider mb-2">
              {isAr ? 'قائمة الطعام الأصلية' : 'Authentic Menu'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'منيو مطعم الطيب' : 'El-Tayeb Dining Menu'}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {isAr
              ? 'مأكولات مصرية طازجة تذبح وتطهى يومياً بأجود بهارات صعيد مصر. اختر وجبتك واطلب مباشرة للتوصيل أو الاستلام.'
              : 'Fresh Egyptian dishes prepared daily with prime ingredients. Select your meals and order directly via WhatsApp or takeaway.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-8 pb-4 border-b border-[#212836]">
          {/* Category Tabs (Interactive buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#e4a74e] text-zinc-950 shadow-md shadow-[#e4a74e]/20'
                      : 'bg-[#151922] text-zinc-300 hover:text-white hover:bg-[#1f2635] border border-[#273041]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Box & Discrete Admin Button */}
          <div className="flex items-center gap-2">
            <div className="relative min-w-[240px] flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث عن طبق (كباب، طاجن، حمام...)' : 'Search dish (kebab, tagine...)'}
                className="w-full bg-[#151922] border border-[#273041] rounded-lg py-2 pr-9 pl-4 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Discrete Lock Button for Restaurant Owner/Chef to publish dishes */}
            <button
              onClick={onOpenAdmin}
              className="p-2.5 bg-[#151922] hover:bg-[#1f2635] text-zinc-500 hover:text-[#e4a74e] rounded-lg border border-[#273041] transition-colors shrink-0"
              title={isAr ? 'لوحة نشر الأكلات وإدارة المنيو (محمية بكلمة مرور)' : 'Kitchen Management Portal (Password Protected)'}
              aria-label="Admin Portal"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 bg-[#12161e] rounded-2xl border border-[#212938]">
            <p className="text-base font-semibold">
              {isAr ? 'لم نجد أطباقاً تطابق بحثك' : 'No dishes matched your search'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#e4a74e] underline"
            >
              {isAr ? 'إعادة ضبط عوامل التصفية' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isAdded = addedItemNotice === item.id;
              const photos = item.images || (item.image ? [item.image] : []);
              const hasPhotos = photos.length > 0;

              return (
                <div
                  key={item.id}
                  className="bg-[#141820] rounded-2xl border border-[#232b39] overflow-hidden flex flex-col justify-between hover:border-[#38455a] transition-all group"
                >
                  {/* If item has photos (uploaded by owner or system), display the photo header */}
                  {hasPhotos ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#181f2b]">
                      <img
                        src={photos[0]}
                        alt={item.name}
                        onClick={() => openGallery(item, 0)}
                        className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141820] via-transparent to-transparent opacity-75 pointer-events-none" />

                      {/* Photo counter button */}
                      {photos.length > 1 && (
                        <button
                          onClick={() => openGallery(item, 0)}
                          className="absolute bottom-3 left-3 bg-[#0d0f12]/85 hover:bg-black text-[#e4a74e] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#e4a74e]/30 flex items-center gap-1.5 transition-colors"
                        >
                          <Images className="w-3.5 h-3.5" />
                          <span>{photos.length} {isAr ? 'صور' : 'photos'}</span>
                        </button>
                      )}

                      {/* Tag Badge */}
                      {item.tag && (
                        <div className="absolute top-3 right-3 bg-[#0d0f12]/90 backdrop-blur-md text-[#e4a74e] text-[11px] font-bold px-2.5 py-1 rounded border border-[#e4a74e]/30">
                          {item.tag}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Clean Header Badge Strip (When no image is uploaded) */
                    <div className="px-5 pt-4 pb-1 flex items-center justify-between border-b border-[#1c232f]">
                      <span className="font-mono text-[11px] text-[#e4a74e] font-semibold">
                        {item.category === 'platters'
                          ? (isAr ? 'صواني الملوك' : 'Royal Trays')
                          : item.category === 'grills'
                          ? (isAr ? 'مشويات ع الفحم' : 'Grills')
                          : item.category === 'tagines'
                          ? (isAr ? 'طاجن فخار' : 'Clay Tagine')
                          : (isAr ? 'مقبلات وأطباق جانبية' : 'Sides')}
                      </span>
                      <div className="flex items-center gap-2">
                        {item.tag && (
                          <span className="text-[10px] text-[#e4a74e] bg-[#e4a74e]/10 px-2 py-0.5 rounded font-bold border border-[#e4a74e]/30">
                            {item.tag}
                          </span>
                        )}
                        {item.serves && (
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {item.serves}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Quiet Header Meta */}
                      <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                        <span className="font-mono text-[11px] text-[#e4a74e]">
                          {item.category === 'platters'
                            ? (isAr ? 'صواني الملوك' : 'Royal Trays')
                            : item.category === 'grills'
                            ? (isAr ? 'مشويات ع الفحم' : 'Grills')
                            : item.category === 'tagines'
                            ? (isAr ? 'طاجن فخار' : 'Clay Tagine')
                            : (isAr ? 'مقبلات وأطباق جانبية' : 'Sides')}
                        </span>
                        {item.weightOptions && (
                          <span className="text-[11px] text-zinc-400 font-medium">
                            {isAr ? 'أوزان متعددة' : 'Multiple sizes'}
                          </span>
                        )}
                      </div>

                      {/* Title & Price */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white font-['Cairo'] group-hover:text-[#f0be65] transition-colors leading-snug">
                          {isAr ? item.name : item.nameEn}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed line-clamp-3">
                        {isAr ? item.description : item.descriptionEn}
                      </p>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between gap-3">
                      <div>
                        <span className="text-lg font-black text-white tabular-nums font-['Plus_Jakarta_Sans']">
                          {item.price}
                        </span>
                        <span className="text-xs text-zinc-400 mr-1">{isAr ? 'ج.م' : 'EGP'}</span>
                        {item.weightOptions && (
                          <span className="block text-[10px] text-zinc-500">
                            {isAr ? 'يبدأ من' : 'starts at'}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleQuickAdd(item)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#1e2531] hover:bg-[#e4a74e] text-zinc-200 hover:text-zinc-950 border border-[#2b3545] hover:border-[#e4a74e]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>{item.weightOptions ? (isAr ? 'اختر الحجم' : 'Select Size') : (isAr ? 'أضف للطلب' : 'Add to Order')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Portion / Size Selector Modal */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141820] border border-[#2b3545] rounded-2xl max-w-md w-full p-6 text-right space-y-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-bold text-white font-['Cairo']">
                {isAr ? selectedItemForModal.name : selectedItemForModal.nameEn}
              </h3>
            </div>

            <p className="text-xs text-zinc-400">
              {isAr ? selectedItemForModal.description : selectedItemForModal.descriptionEn}
            </p>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-zinc-300">
                {isAr ? 'اختر الوزن / الحجم المطلوب:' : 'Select Portion / Size:'}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedItemForModal.weightOptions?.map((opt, idx) => (
                  <button
                    key={opt.label}
                    onClick={() => setModalSelectedWeightIndex(idx)}
                    className={`p-3 rounded-xl border text-right transition-all ${
                      modalSelectedWeightIndex === idx
                        ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white'
                        : 'border-[#263040] bg-[#1a202c] text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <div className="text-xs font-bold">{opt.label}</div>
                    <div className="text-sm font-extrabold text-[#e4a74e] tabular-nums mt-1">
                      {opt.price} {isAr ? 'ج.م' : 'EGP'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleModalAdd}
                className="flex-1 py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors"
              >
                {isAr ? 'تأكيد وإضافة للسلة' : 'Confirm & Add to Cart'}
              </button>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="py-3 px-4 bg-[#1f2633] text-zinc-300 font-bold rounded-xl text-sm hover:text-white"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Photo Gallery Modal (When dish has multiple photos up to 10) */}
      {galleryItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-[#121620] border border-[#263246] rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5 text-right">
            <div className="flex items-center justify-between border-b border-[#212939] pb-3">
              <button
                onClick={() => setGalleryItem(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1a2130]"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h4 className="text-base font-bold text-white font-['Cairo']">
                  {galleryItem.name}
                </h4>
                <div className="text-xs text-zinc-400">
                  {isAr ? 'ألبوم صور الطبق' : 'Photo Gallery'}
                </div>
              </div>
            </div>

            {/* Main Preview Photo */}
            {(() => {
              const allImgs = galleryItem.images || (galleryItem.image ? [galleryItem.image] : []);
              const currentImg = allImgs[activePhotoIndex] || allImgs[0];

              return (
                <div className="space-y-3">
                  <div className="relative aspect-[16/10] bg-black/60 rounded-xl overflow-hidden flex items-center justify-center border border-[#202738]">
                    <img
                      src={currentImg}
                      alt={galleryItem.name}
                      className="w-full h-full object-contain"
                    />

                    {/* Next / Previous arrows */}
                    {allImgs.length > 1 && (
                      <>
                        <button
                          onClick={() => setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : allImgs.length - 1))}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setActivePhotoIndex((prev) => (prev < allImgs.length - 1 ? prev + 1 : 0))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-md font-mono tabular-nums">
                      {activePhotoIndex + 1} / {allImgs.length}
                    </span>
                  </div>

                  {/* Thumbnail Row */}
                  {allImgs.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {allImgs.map((thumb, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIndex(idx)}
                          className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                            activePhotoIndex === idx
                              ? 'border-[#e4a74e] scale-105'
                              : 'border-[#263143] opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={thumb} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="pt-2 flex items-center justify-between border-t border-[#202838]">
              <div>
                <span className="text-lg font-black text-white font-mono tabular-nums">
                  {galleryItem.price} {isAr ? 'ج.م' : 'EGP'}
                </span>
              </div>
              <button
                onClick={() => {
                  handleQuickAdd(galleryItem);
                  setGalleryItem(null);
                }}
                className="px-5 py-2.5 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>{isAr ? 'إضافة هذا الطبق للطلب' : 'Add to Order'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
