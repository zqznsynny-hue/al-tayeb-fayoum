import React, { useState } from 'react';
import { X, Calendar, Clock, Users, ShieldCheck, Sparkles, Send, CheckCircle2, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'ar' | 'en';
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [seatingType, setSeatingType] = useState<'vip' | 'family' | 'kids' | 'hall'>('vip');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('08:00');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('عائلي');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [confirmedVoucher, setConfirmedVoucher] = useState<string | null>(null);

  if (!isOpen) return null;

  const isAr = language === 'ar';

  const seatingOptions = [
    {
      id: 'vip',
      title: isAr ? 'غرفة خاصة VIP' : 'VIP Private Room',
      desc: isAr ? 'مستقلة ومكيفة للمجموعات الكبيرة وعزومات العمل' : 'Private suite for groups & business dining',
      badge: isAr ? 'الأكثر طلباً' : 'Popular',
    },
    {
      id: 'family',
      title: isAr ? 'صالة العائلات الهادئة' : 'Quiet Family Section',
      desc: isAr ? 'طاولات فسيحة مريحة لأفراد الأسرة' : 'Spacious comfortable tables for family dining',
      badge: isAr ? 'عائلي مميز' : 'Comfort',
    },
    {
      id: 'kids',
      title: isAr ? 'طاولة قرب ألعاب الأطفال' : 'Near Kids Play Zone',
      desc: isAr ? 'في الدور العلوي لمتابعة الأطفال بسهولة' : 'Upper floor near supervised play zone',
      badge: isAr ? 'ترفيه' : 'Family & Play',
    },
    {
      id: 'hall',
      title: isAr ? 'الصالة الرئيسية' : 'Main Dining Hall',
      desc: isAr ? 'أجواء مطعم حيوية ومميزة' : 'Spacious open restaurant dining',
      badge: isAr ? 'طاولات سريعة' : 'Casual',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const voucherCode = `TYB-${Math.floor(100000 + Math.random() * 900000)}`;

    const selectedOption = seatingOptions.find((s) => s.id === seatingType);

    const bookingMsg = isAr
      ? `*طلب حجز طاولة / غرفة VIP في مطعم الطيب (الفيوم)*\n` +
        `كود الحجز: #${voucherCode}\n` +
        `━━━━━━━━━━━━━━━\n` +
        `الاسم: ${name}\n` +
        `الهاتف: ${phone}\n` +
        `نوع الجلسة: ${selectedOption?.title}\n` +
        `عدد الضيوف: ${guestCount} أفراد\n` +
        `التاريخ: ${date}\n` +
        `الوقت: ${time}\n` +
        `المناسبة: ${occasion}\n` +
        (specialRequest ? `طلبات خاصة: ${specialRequest}\n` : '') +
        `يرجى تأكيد الحجز وإشعارنا بجاهزية الغرفة.`
      : `*Table / VIP Reservation at El-Tayeb Fayoum*\n` +
        `Voucher: #${voucherCode}\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Seating: ${selectedOption?.title}\n` +
        `Guests: ${guestCount}\n` +
        `Date: ${date} at ${time}\n`;

    const waUrl = `https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodeURIComponent(bookingMsg)}`;
    window.open(waUrl, '_blank');
    setConfirmedVoucher(voucherCode);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141820] border border-[#2b3545] rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-right space-y-6 shadow-2xl relative my-8">
        <div className="flex items-center justify-between border-b border-[#232b38] pb-4">
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1f2635]"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[11px] font-bold text-[#e4a74e]">
              {isAr ? 'غرف خاصة وجلسات VIP' : 'VIP Suites & Majlis Booking'}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'حجز طاولة أو غرفة خاصة في مطعم الطيب' : 'Reserve Table or Private Room'}
            </h3>
          </div>
        </div>

        {confirmedVoucher ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white font-['Cairo']">
              {isAr ? 'تم تسجيل وتجهيز طلب حجزك!' : 'Reservation Request Dispatched!'}
            </h4>
            <div className="p-4 bg-[#0d0f12] rounded-xl border border-[#232c3a] max-w-sm mx-auto text-center space-y-1">
              <div className="text-xs text-zinc-400">{isAr ? 'كود قسيمة الحجز:' : 'Booking Voucher Code:'}</div>
              <div className="text-2xl font-black text-[#e4a74e] font-mono tracking-wider">
                {confirmedVoucher}
              </div>
              <div className="text-[11px] text-zinc-500">
                {isAr ? 'تم إرسال تفاصيل الحجز عبر الواتساب لإدارة المطعم' : 'Details sent to restaurant reception via WhatsApp'}
              </div>
            </div>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'فريق استقبال مطعم الطيب بفرع دله في انتظاركم، وسيتواصل معكم للتأكيد قبل الموعد بنصف ساعة.'
                : 'El-Tayeb reception at Dalla tower awaits your visit. We will confirm half an hour prior.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setConfirmedVoucher(null);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#e4a74e] text-zinc-950 font-bold rounded-xl text-sm"
              >
                {isAr ? 'تم، إغلاق' : 'Done & Close'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Seating Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-300 block">
                {isAr ? 'اختر نوع الجلسة المفضلة:' : 'Select Preferred Seating:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSeatingType(opt.id as any)}
                    className={`p-3.5 rounded-xl border text-right transition-all flex flex-col justify-between ${
                      seatingType === opt.id
                        ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white shadow-md'
                        : 'border-[#263141] bg-[#161c26] text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{opt.title}</span>
                      <span className="text-[10px] text-[#e4a74e] font-semibold">{opt.badge}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 leading-snug">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid: Guests, Date, Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#e4a74e]" />
                  <span>{isAr ? 'عدد الأفراد' : 'Guests'}</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e4a74e]"
                >
                  <option value={2}>2 {isAr ? 'أفراد' : 'Guests'}</option>
                  <option value={4}>4 {isAr ? 'أفراد (عائلي)' : 'Guests'}</option>
                  <option value={6}>6 {isAr ? 'أفراد' : 'Guests'}</option>
                  <option value={8}>8 {isAr ? 'أفراد (مجموعة كبيرة)' : 'Guests'}</option>
                  <option value={12}>12 {isAr ? 'فرداً (غرفة VIP كاملة)' : 'Guests (Full VIP)'}</option>
                  <option value={20}>20+ {isAr ? 'فرداً (غداء عمل / مناسبة)' : 'Guests (Banquet)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#e4a74e]" />
                  <span>{isAr ? 'التاريخ' : 'Date'}</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e4a74e]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#e4a74e]" />
                  <span>{isAr ? 'موعد الوصول' : 'Time'}</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#e4a74e]"
                >
                  <option value="13:00">1:00 PM ({isAr ? 'غداء مبكر' : 'Lunch'})</option>
                  <option value="15:00">3:00 PM ({isAr ? 'غداء' : 'Lunch'})</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="19:00">7:00 PM ({isAr ? 'عشاء عائلي' : 'Dinner'})</option>
                  <option value="20:00">8:00 PM ({isAr ? 'عشاء' : 'Dinner'})</option>
                  <option value="21:30">9:30 PM ({isAr ? 'سهرة مشويات' : 'Late Dinner'})</option>
                  <option value="23:00">11:00 PM</option>
                  <option value="01:00">1:00 AM ({isAr ? 'سحور / عشاء متأخر' : 'Midnight'})</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                  {isAr ? 'اسم صاحب الحجز' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? 'مثال: أ. محمود عبد الرازق' : 'Your name'}
                  className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                  {isAr ? 'رقم الهاتف للتأكيد' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010XXXXXXXX"
                  className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                {isAr ? 'ملاحظات خاصة (تجهيز صواني الطيب مسبقاً، مناسبة عيد ميلاد، مقاعد أطفال):' : 'Special requests / notes:'}
              </label>
              <input
                type="text"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder={isAr ? 'مثال: نرجو تجهيز صينية ملوك مشويات قبل وصولنا بربع ساعة' : 'Optional notes'}
                className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
              />
            </div>

            {/* Submit Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-[#e4a74e] to-[#c68e3f] hover:from-[#f0be65] hover:to-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c68e3f]/20"
              >
                <Send className="w-4 h-4" />
                <span>{isAr ? 'تأكيد الحجز الفوري وإرسال التذكرة' : 'Confirm & Send Reservation'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1e2531] text-zinc-300 font-bold rounded-xl text-sm hover:text-white border border-[#2a3443]"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
