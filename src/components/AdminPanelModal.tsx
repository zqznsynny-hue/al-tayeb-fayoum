import React, { useState, useEffect } from 'react';
import { X, Lock, KeyRound, Plus, Trash2, Edit3, Check, AlertCircle, Eye, EyeOff, ShieldCheck, Sparkles, RefreshCw, ImagePlus, Images, Upload } from 'lucide-react';
import { MenuItem } from '../data/restaurantData';
import { compressImageFile } from '../utils/imageCompressor';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddMenuItem: (item: MenuItem) => void;
  onUpdateMenuItem: (item: MenuItem) => void;
  onDeleteMenuItem: (id: string) => void;
  onResetMenu: () => void;
  language: 'ar' | 'en';
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onResetMenu,
  language,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('tayeb_admin_pass') || '1234';
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'settings'>('add');

  // New Dish Form State
  const [dishName, setDishName] = useState('');
  const [dishNameEn, setDishNameEn] = useState('');
  const [dishCategory, setDishCategory] = useState<'platters' | 'grills' | 'tagines' | 'appetizers' | 'desserts' | 'drinks'>('grills');
  const [dishPrice, setDishPrice] = useState<number>(250);
  const [dishDescription, setDishDescription] = useState('');
  const [dishTag, setDishTag] = useState('');
  const [dishServes, setDishServes] = useState('');
  const [hasWeights, setHasWeights] = useState(false);
  const [halfPrice, setHalfPrice] = useState<number>(250);
  const [fullPrice, setFullPrice] = useState<number>(480);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Editing existing dish state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editName, setEditName] = useState<string>('');
  const [managingImagesItem, setManagingImagesItem] = useState<MenuItem | null>(null);

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isAr = language === 'ar';

  useEffect(() => {
    if (!isOpen) {
      setErrorMsg(null);
      setPasswordInput('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setErrorMsg(null);
    } else {
      setErrorMsg(isAr ? 'كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.' : 'Incorrect password.');
    }
  };

  // Handle uploading photos for new dish (max 10)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 10 - uploadedImages.length;
    if (remainingSlots <= 0) {
      setErrorMsg(isAr ? 'لقد بلغت الحد الأقصى (10 صور) لهذا الطبق.' : 'Maximum 10 images reached.');
      return;
    }

    setIsCompressing(true);
    setErrorMsg(null);

    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const newCompressedList: string[] = [];

    for (const file of filesToProcess) {
      try {
        const compressedBase64 = await compressImageFile(file, 800, 0.75);
        newCompressedList.push(compressedBase64);
      } catch (err) {
        console.error('Error compressing image', err);
      }
    }

    setUploadedImages((prev) => [...prev, ...newCompressedList]);
    setIsCompressing(false);
    e.target.value = '';
  };

  const removeUploadedImageAt = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle uploading extra photo to an existing dish
  const handleExistingDishImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!managingImagesItem) return;
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentImages = managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : []);
    const remainingSlots = 10 - currentImages.length;
    if (remainingSlots <= 0) {
      alert(isAr ? 'الحد الأقصى لكل طبق هو 10 صور.' : 'Max 10 images allowed.');
      return;
    }

    setIsCompressing(true);
    const filesToProcess = Array.from(files).slice(0, remainingSlots);
    const newImgs: string[] = [];

    for (const f of filesToProcess) {
      try {
        const b64 = await compressImageFile(f, 800, 0.75);
        newImgs.push(b64);
      } catch (err) {
        console.error(err);
      }
    }

    const updatedList = [...currentImages, ...newImgs];
    const updatedDish: MenuItem = {
      ...managingImagesItem,
      images: updatedList,
      image: updatedList[0],
    };

    onUpdateMenuItem(updatedDish);
    setManagingImagesItem(updatedDish);
    setIsCompressing(false);
    e.target.value = '';
  };

  const removeExistingDishImageAt = (index: number) => {
    if (!managingImagesItem) return;
    const currentImages = managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : []);
    const updatedList = currentImages.filter((_, i) => i !== index);

    const updatedDish: MenuItem = {
      ...managingImagesItem,
      images: updatedList,
      image: updatedList.length > 0 ? updatedList[0] : undefined,
    };

    onUpdateMenuItem(updatedDish);
    setManagingImagesItem(updatedDish);
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;

    const newItem: MenuItem = {
      id: `custom-dish-${Date.now()}`,
      name: dishName.trim(),
      nameEn: dishNameEn.trim() || dishName.trim(),
      category: dishCategory,
      price: Number(dishPrice),
      description: dishDescription.trim() || (isAr ? 'طبق طازج ولذيذ محضر بأجود توابل مطبخ الطيب.' : 'Freshly prepared specialty.'),
      descriptionEn: dishDescription.trim() || 'Delicious freshly made specialty from El-Tayeb kitchen.',
      image: uploadedImages[0] || undefined,
      images: uploadedImages.length > 0 ? uploadedImages : undefined,
      tag: dishTag.trim() || undefined,
      serves: dishServes.trim() || undefined,
      weightOptions: hasWeights
        ? [
            { label: isAr ? 'نصف كيلو' : 'Half Kilo', price: Number(halfPrice) },
            { label: isAr ? 'كيلو كامل' : '1 Kilo', price: Number(fullPrice) },
          ]
        : undefined,
      isPopular: dishTag.includes('شائع') || dishTag.includes('طلب'),
    };

    onAddMenuItem(newItem);
    setSuccessMsg(isAr ? `تم نشر طبق "${newItem.name}" بنجاح في الموقع مع (${uploadedImages.length} صور)!` : `Dish "${newItem.name}" published with ${uploadedImages.length} photos!`);

    // Reset Form
    setDishName('');
    setDishNameEn('');
    setDishPrice(250);
    setDishDescription('');
    setDishTag('');
    setDishServes('');
    setHasWeights(false);
    setUploadedImages([]);

    setTimeout(() => setSuccessMsg(null), 3500);
  };

  const handleSaveInlineEdit = (item: MenuItem) => {
    const updated: MenuItem = {
      ...item,
      name: editName.trim() || item.name,
      price: Number(editPrice) || item.price,
    };
    onUpdateMenuItem(updated);
    setEditingItemId(null);
    setSuccessMsg(isAr ? 'تم تحديث بيانات الطبق بنجاح.' : 'Dish updated.');
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 3) {
      setErrorMsg(isAr ? 'كلمة المرور يجب أن تكون 3 خانات على الأقل.' : 'Password must be at least 3 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg(isAr ? 'كلمتا المرور غير متطابقتين.' : 'Passwords do not match.');
      return;
    }

    localStorage.setItem('tayeb_admin_pass', newPassword);
    setAdminPassword(newPassword);
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg(null);
    setSuccessMsg(isAr ? 'تم تغيير كلمة المرور بنجاح!' : 'Password changed successfully!');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#131720] border border-[#2b3548] rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl relative my-8">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#222a38] pb-4">
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1c2330]"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e4a74e]/10 border border-[#e4a74e]/20 text-[#e4a74e] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-[#e4a74e]">
                {isAr ? 'لوحة إدارة المطعم ونشر الأكلات' : 'Restaurant Management Portal'}
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Cairo']">
                {isAr ? 'إدارة المنيو ورفع الصور وحذف الأطباق' : 'Menu & Image Management'}
              </h3>
            </div>
          </div>
        </div>

        {/* Step 1: Login Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="py-6 max-w-sm mx-auto space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1b2230] border border-[#2b374a] text-[#e4a74e] flex items-center justify-center mx-auto shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-white font-['Cairo']">
                {isAr ? 'تسجيل دخول إدارة المطعم' : 'Admin Authorization'}
              </h4>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder={isAr ? 'أدخل كلمة المرور السرية' : 'Enter secret password'}
                  className="w-full bg-[#181f2c] border border-[#2c3749] rounded-xl py-3 pr-4 pl-10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e] text-center tracking-widest font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {errorMsg && (
                <div className="text-xs text-rose-400 flex items-center justify-center gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors shadow"
              >
                {isAr ? 'دخول لوحة التحكم' : 'Enter Dashboard'}
              </button>

              <div className="text-[11px] text-zinc-500 text-center">
                {isAr ? 'منطقة محمية - خاصة بإدارة المطعم والمشرفين فقط' : 'Protected area - authorized staff only'}
              </div>
            </form>
          </div>
        ) : (
          /* Step 2: Authenticated Management Panel */
          <div className="space-y-6">
            {/* Success & Status Banner */}
            {successMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-[#222a38] pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'add'
                      ? 'bg-[#e4a74e] text-zinc-950 font-black'
                      : 'bg-[#181f2b] text-zinc-400 hover:text-white border border-[#273243]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نشر أكلة جديدة + صور' : 'Publish Dish + Photos'}</span>
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('manage');
                    setManagingImagesItem(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'manage'
                      ? 'bg-[#e4a74e] text-zinc-950 font-black'
                      : 'bg-[#181f2b] text-zinc-400 hover:text-white border border-[#273243]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isAr ? `تعديل وحذف الأكلات (${menuItems.length})` : `Manage Dishes (${menuItems.length})`}</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#e4a74e] text-zinc-950 font-black'
                      : 'bg-[#181f2b] text-zinc-400 hover:text-white border border-[#273243]'
                  }`}
                >
                  <span>{isAr ? 'الأمان وكلمة المرور' : 'Security'}</span>
                </button>
              </div>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-zinc-500 hover:text-rose-400 transition-colors"
              >
                {isAr ? 'تسجيل خروج' : 'Log out'}
              </button>
            </div>

            {/* Tab 1: Publish New Dish Form with Multi-Image Uploader (up to 10 photos) */}
            {activeTab === 'add' && (
              <form onSubmit={handleCreateDish} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'اسم الأكلة / الطبق (بالعربية):' : 'Dish Name (Arabic):'}
                    </label>
                    <input
                      type="text"
                      required
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder={isAr ? 'مثال: صينية عشاء الطيب الفاخرة' : 'e.g. Mixed Grill Special'}
                      className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'الاسم بالإنجليزية (اختياري):' : 'Dish Name (English):'}
                    </label>
                    <input
                      type="text"
                      value={dishNameEn}
                      onChange={(e) => setDishNameEn(e.target.value)}
                      placeholder="e.g. Tayeb Special Banquet"
                      className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'قسم القائمة:' : 'Category:'}
                    </label>
                    <select
                      value={dishCategory}
                      onChange={(e) => setDishCategory(e.target.value as any)}
                      className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e4a74e]"
                    >
                      <option value="platters">{isAr ? 'صواني الطيب الملكية' : 'Royal Platters'}</option>
                      <option value="grills">{isAr ? 'مشويات ع الفحم' : 'Charcoal Grills'}</option>
                      <option value="tagines">{isAr ? 'طواجن فخار' : 'Clay Tagines'}</option>
                      <option value="appetizers">{isAr ? 'محاشي ومقبلات وشورب' : 'Appetizers & Soups'}</option>
                      <option value="desserts">{isAr ? 'حلويات شرقية' : 'Desserts'}</option>
                      <option value="drinks">{isAr ? 'مشروبات وعصائر' : 'Drinks'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'السعر الأساسي (بالجنيه المصري ج.م):' : 'Base Price (EGP):'}
                    </label>
                    <input
                      type="number"
                      required
                      min={10}
                      value={dishPrice}
                      onChange={(e) => setDishPrice(Number(e.target.value))}
                      className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white font-mono tabular-nums focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'شارة مميزة (اختياري):' : 'Badge Tag (Optional):'}
                    </label>
                    <input
                      type="text"
                      value={dishTag}
                      onChange={(e) => setDishTag(e.target.value)}
                      placeholder={isAr ? 'مثال: جديد، الأكثر طلباً، عرض الشيف' : 'e.g. Chef Special, Popular'}
                      className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                    {isAr ? 'وصف المكونات وطريقة الطهي:' : 'Ingredients & Cooking Details:'}
                  </label>
                  <textarea
                    rows={2}
                    value={dishDescription}
                    onChange={(e) => setDishDescription(e.target.value)}
                    placeholder={isAr ? 'اكتب مكونات الوجبة، التوابل، وطريقة التقديم...' : 'Description of ingredients and preparation...'}
                    className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>

                {/* Multiple Weights Toggle */}
                <div className="p-3 bg-[#161c28] rounded-xl border border-[#242f40] space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-300">
                    <input
                      type="checkbox"
                      checked={hasWeights}
                      onChange={(e) => setHasWeights(e.target.checked)}
                      className="rounded text-[#e4a74e] focus:ring-0"
                    />
                    <span>{isAr ? 'يتوفر منه أوزان مختلفة (نصف كيلو / كيلو)' : 'Has portion weights (half / 1 kilo)'}</span>
                  </label>

                  {hasWeights && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <span className="text-[11px] text-zinc-400 block mb-1">{isAr ? 'سعر النصف كيلو (ج.م):' : 'Half Kilo Price (EGP):'}</span>
                        <input
                          type="number"
                          value={halfPrice}
                          onChange={(e) => setHalfPrice(Number(e.target.value))}
                          className="w-full bg-[#11151e] border border-[#242f40] rounded-lg p-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-zinc-400 block mb-1">{isAr ? 'سعر الكيلو الكامل (ج.م):' : 'Full Kilo Price (EGP):'}</span>
                        <input
                          type="number"
                          value={fullPrice}
                          onChange={(e) => setFullPrice(Number(e.target.value))}
                          className="w-full bg-[#11151e] border border-[#242f40] rounded-lg p-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Photo Upload Zone (Max 10 Images per Dish) */}
                <div className="p-4 bg-[#161c28] rounded-xl border border-[#263143] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Images className="w-4 h-4 text-[#e4a74e]" />
                      <span className="text-xs font-bold text-white">
                        {isAr ? 'صور الأكلة (أقصى شيء 10 صور):' : 'Dish Photos (Up to 10 photos):'}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#e4a74e] tabular-nums">
                      {uploadedImages.length} / 10 {isAr ? 'صور' : 'photos'}
                    </span>
                  </div>

                  {/* Upload button */}
                  {uploadedImages.length < 10 && (
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#2f3d53] hover:border-[#e4a74e] rounded-xl cursor-pointer bg-[#121620] hover:bg-[#151a26] transition-all">
                      <Upload className="w-6 h-6 text-[#e4a74e] mb-1" />
                      <span className="text-xs font-bold text-zinc-200">
                        {isAr ? 'انقر لاختيار صور من جهازك أو هاتفك' : 'Click to select photos from device'}
                      </span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">
                        {isAr ? `يمكنك اختيار حتى ${10 - uploadedImages.length} صور إضافية (JPG / PNG)` : `Select up to ${10 - uploadedImages.length} more images`}
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {isCompressing && (
                    <div className="text-xs text-[#e4a74e] animate-pulse text-center">
                      {isAr ? 'جاري ضغط وتجهيز الصور بدقة عالية...' : 'Compressing photos for fast loading...'}
                    </div>
                  )}

                  {/* Preview Thumbnails with Delete button */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 pt-2">
                      {uploadedImages.map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-lg overflow-hidden border border-[#2f3d53] group bg-[#0d0f14]"
                        >
                          <img
                            src={imgSrc}
                            alt={`صورة ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeUploadedImageAt(idx)}
                            className="absolute top-1 right-1 p-1 bg-rose-600/90 hover:bg-rose-600 text-white rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
                            title={isAr ? 'حذف هذه الصورة' : 'Delete photo'}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                          <span className="absolute bottom-1 left-1 text-[9px] bg-black/70 px-1 rounded text-white font-mono">
                            #{idx + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#e4a74e] to-[#c68e3f] hover:from-[#f0be65] hover:to-[#d09439] text-zinc-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c68e3f]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAr ? 'نشر الطبق فوراً في الموقع للزبائن' : 'Publish Dish to Live Menu'}</span>
                </button>
              </form>
            )}

            {/* Tab 2: Manage Existing Dishes & Their Photos (Delete dish or delete photos) */}
            {activeTab === 'manage' && (
              <div className="space-y-4">
                {/* Sub-view: If editing photos of a specific dish */}
                {managingImagesItem ? (
                  <div className="p-4 bg-[#161c28] rounded-xl border border-[#2b3749] space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#232c3c]">
                      <div>
                        <div className="text-xs text-[#e4a74e] font-bold">
                          {isAr ? 'إدارة صور الطبق:' : 'Managing Photos for:'}
                        </div>
                        <h4 className="text-base font-bold text-white font-['Cairo']">
                          {managingImagesItem.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => setManagingImagesItem(null)}
                        className="px-3 py-1.5 bg-[#202735] text-zinc-300 text-xs font-bold rounded-lg hover:text-white"
                      >
                        {isAr ? '← رجوع لقائمة الأكلات' : '← Back'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">
                        {isAr ? 'الصور المرفوعة لهذا الطبق (أقصى شيء 10 صور):' : 'Uploaded photos (max 10):'}
                      </span>
                      <span className="text-[#e4a74e] font-mono tabular-nums font-bold">
                        {(managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : [])).length} / 10
                      </span>
                    </div>

                    {/* Upload new photo to this item */}
                    {(managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : [])).length < 10 && (
                      <label className="flex items-center justify-center gap-2 p-3 border border-dashed border-[#344258] hover:border-[#e4a74e] rounded-xl cursor-pointer bg-[#11151f] transition-colors">
                        <Upload className="w-4 h-4 text-[#e4a74e]" />
                        <span className="text-xs font-bold text-zinc-300">
                          {isAr ? 'إضافة صورة جديدة لهذا الطبق' : 'Add another photo'}
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleExistingDishImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}

                    {isCompressing && (
                      <div className="text-xs text-[#e4a74e] animate-pulse text-center">
                        {isAr ? 'جاري رفع وضغط الصورة...' : 'Processing image...'}
                      </div>
                    )}

                    {/* Display photos of this item with Delete button */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                      {(managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : [])).map((imgUrl, i) => (
                        <div
                          key={i}
                          className="relative aspect-square rounded-lg overflow-hidden border border-[#2b3547] group bg-[#0d0f14]"
                        >
                          <img
                            src={imgUrl}
                            alt={`${managingImagesItem.name} ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingDishImageAt(i)}
                            className="absolute top-1 right-1 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow transition-colors"
                            title={isAr ? 'حذف هذه الصورة من الموقع' : 'Delete this photo'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="absolute bottom-1 left-1 text-[9px] bg-black/75 px-1 rounded text-white font-mono">
                            #{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    {(managingImagesItem.images || (managingImagesItem.image ? [managingImagesItem.image] : [])).length === 0 && (
                      <div className="text-xs text-zinc-500 text-center py-4">
                        {isAr ? 'لا توجد صور مضافة لهذا الطبق بعد. يمكنك رفع صورة الآن.' : 'No photos yet.'}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="text-xs text-zinc-400">
                      {isAr ? 'يمكنك هنا مسح أي أكلة حطيتها في الموقع، أو تعديل سعرها، أو إدارة صورها (حتى 10 صور):' : 'Manage published dishes, edit prices, update photos, or delete dishes:'}
                    </div>

                    <div className="max-h-96 overflow-y-auto space-y-2.5 pr-1">
                      {menuItems.map((item) => {
                        const isEditing = editingItemId === item.id;
                        const itemPhotos = item.images || (item.image ? [item.image] : []);

                        return (
                          <div
                            key={item.id}
                            className="p-3.5 bg-[#171e2a] rounded-xl border border-[#273345] flex items-center justify-between gap-3"
                          >
                            {isEditing ? (
                              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="bg-[#11151e] border border-[#2f3d52] rounded p-1.5 text-xs text-white"
                                />
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(Number(e.target.value))}
                                    className="w-24 bg-[#11151e] border border-[#2f3d52] rounded p-1.5 text-xs text-white font-mono"
                                  />
                                  <span className="text-xs text-zinc-400">{isAr ? 'ج.م' : 'EGP'}</span>
                                  <button
                                    onClick={() => handleSaveInlineEdit(item)}
                                    className="px-3 py-1.5 bg-[#e4a74e] text-zinc-950 rounded text-xs font-bold"
                                  >
                                    {isAr ? 'حفظ' : 'Save'}
                                  </button>
                                  <button
                                    onClick={() => setEditingItemId(null)}
                                    className="px-2 py-1.5 bg-[#202836] text-zinc-400 rounded text-xs"
                                  >
                                    {isAr ? 'إلغاء' : 'Cancel'}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-bold text-white font-['Cairo']">
                                      {isAr ? item.name : item.nameEn}
                                    </span>
                                    {item.tag && (
                                      <span className="text-[10px] text-[#e4a74e] bg-[#e4a74e]/10 px-1.5 py-0.5 rounded border border-[#e4a74e]/30">
                                        {item.tag}
                                      </span>
                                    )}
                                    {itemPhotos.length > 0 ? (
                                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                                        {itemPhotos.length} {isAr ? 'صور' : 'photos'}
                                      </span>
                                    ) : (
                                      <span className="text-[10px] text-zinc-500 font-mono">
                                        {isAr ? 'بدون صور' : 'No photos'}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-zinc-400 font-mono mt-0.5">
                                    <span className="text-white font-bold tabular-nums">{item.price} {isAr ? 'ج.م' : 'EGP'}</span>
                                    <span className="mx-1.5 text-zinc-600">·</span>
                                    <span>{item.category}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  {/* Manage Photos Button */}
                                  <button
                                    onClick={() => setManagingImagesItem(item)}
                                    className="px-2.5 py-1.5 text-xs text-[#e4a74e] bg-[#e4a74e]/10 hover:bg-[#e4a74e]/20 rounded-lg border border-[#e4a74e]/30 transition-colors flex items-center gap-1"
                                    title={isAr ? 'إدارة صور هذه الأكلة (حتى 10 صور)' : 'Manage photos'}
                                  >
                                    <Images className="w-3.5 h-3.5" />
                                    <span>{isAr ? 'الصور' : 'Photos'}</span>
                                  </button>

                                  {/* Edit Price / Name Button */}
                                  <button
                                    onClick={() => {
                                      setEditingItemId(item.id);
                                      setEditName(item.name);
                                      setEditPrice(item.price);
                                    }}
                                    className="p-2 text-zinc-400 hover:text-[#e4a74e] rounded-lg hover:bg-[#202836] transition-colors"
                                    title={isAr ? 'تعديل السعر والاسم' : 'Edit item'}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {/* Delete Dish Button (يمسح الأكلات الحطها في الموقع) */}
                                  <button
                                    onClick={() => {
                                      if (confirm(isAr ? `هل أنت متأكد من حذف طبق "${item.name}" من الموقع بالكامل؟` : `Delete "${item.name}"?`)) {
                                        onDeleteMenuItem(item.id);
                                        setSuccessMsg(isAr ? `تم حذف طبق "${item.name}" من الموقع.` : 'Dish deleted.');
                                        setTimeout(() => setSuccessMsg(null), 2500);
                                      }
                                    }}
                                    className="p-2 text-zinc-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                    title={isAr ? 'مسح هذه الأكلة من الموقع' : 'Delete item from site'}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#222a38]">
                      <span className="text-xs text-zinc-500">
                        {isAr ? 'التعديلات تُحفظ فورياً وتظهر لزوار الموقع' : 'Changes reflect immediately'}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(isAr ? 'هل تريد استعادة قائمة طعام مطعم الطيب الافتراضية؟' : 'Reset menu to default?')) {
                            onResetMenu();
                          }
                        }}
                        className="text-xs text-zinc-400 hover:text-[#e4a74e] flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{isAr ? 'استعادة القائمة الأصلية' : 'Reset to default'}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Tab 3: Security & Password Settings */}
            {activeTab === 'settings' && (
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md mx-auto pt-2">
                <div className="text-xs text-zinc-300">
                  {isAr
                    ? 'يمكنك تغيير كلمة المرور المخصصة لدخول هذه اللوحة حتى لا يتمكن أحد غيرك من نشر أكلات أو صور أو مسح محتوى الموقع.'
                    : 'Update your management password / PIN:'}
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                    {isAr ? 'كلمة المرور الجديدة:' : 'New Password:'}
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={isAr ? 'أدخل كلمة مرور جديدة' : 'New password'}
                    className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                    {isAr ? 'تأكيد كلمة المرور:' : 'Confirm Password:'}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={isAr ? 'أعد كتابة كلمة المرور' : 'Confirm password'}
                    className="w-full bg-[#171e2a] border border-[#283446] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>

                {errorMsg && (
                  <div className="text-xs text-rose-400 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors"
                >
                  {isAr ? 'حفظ كلمة المرور الجديدة' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
