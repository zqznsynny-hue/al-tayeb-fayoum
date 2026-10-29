import React, { useState } from 'react';
import { Calendar, Clock, Users, ShieldCheck, Sparkles, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationPageProps {
  language: 'ar' | 'en';
}

export const ReservationPage: React.FC<ReservationPageProps> = ({ language }) => {
  const [seatingType, setSeatingType] = useState<'vip' | 'family' | 'kids' | 'hall'>('vip');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState<string>('20:00');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('عائلي');
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [confirmedVoucher, setConfirmedVoucher] = useState<string | null>(null);

  const isAr = language === 'ar';

  const seatingOptions = [
    {
      id: 'vip',
      title: isAr ? 'غرفة خاصة VIP' : 'VIP Private Room',
      desc: isAr ? 'مستقلة ومكيفة للمجموعات الكبيرة وعزومات العمل والخصوصية التامة' : 'Private suite for groups & business dining with full privacy',
      badge: isAr ? 'الأكثر طلباً' : 'Popular',
    },
    {
      id: 'family',
      title: isAr ? 'صالة العائلات الهادئة' : 'Quiet Family Section',
      desc: isAr ? 'طاولات فسيحة ومريحة لأفراد الأسرة في أجواء هادئة' : 'Spacious comfortable tables for family dining',
      badge: isAr ? 'عائلي مميز' : 'Comfort',
    },
    {
      id: 'kids',
      title: isAr ? 'طاولة قرب ألعاب الأطفال' : 'Near Kids Play Zone',
      desc: isAr ? 'في الدور العلوي لمتابعة الأطفال أثناء استمتاعهم بالألعاب' : 'Upper floor near supervised play zone',
      badge: isAr ? 'عائلي وترفيه' : 'Family & Play',
    },
    {
      id: 'hall',
      title: isAr ? 'الصالة الرئيسية' : 'Main Dining Hall',
      desc: isAr ? 'أجواء مطعم مفتوحة وحيوية' : 'Spacious open restaurant dining',
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
    <section className="py-12 lg:py-20 bg-[#0d0f12] text-right">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10 text-right space-y-2">
          <div className="text-xs font-bold text-[#e4a74e] tracking-wider">
            {isAr ? 'صفحة الحجز المسبق' : 'Reservations Page'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo']">
            {isAr ? 'حجز طاولة أو غرفة خاصة VIP' : 'Book a Table or VIP Suite'}
          </h1>
          <p className="text-sm text-zinc-400 max-w-xl">
            {isAr
              ? 'احجز موعدك مسبقاً في مطعم الطيب بالفيوم لضمان تجهيز غرفتك وطاولتك في الوقت المحدد دون أي انتظار.'
              : 'Reserve in advance at El-Tayeb Fayoum to ensure your table or suite is prepared without wait time.'}
          </p>
        </div>

        {confirmedVoucher ? (
          <div className="bg-[#141820] border border-[#2b3545] rounded-2xl p-8 sm:p-12 text-center space-y-5 shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'تم تسجيل طلب حجزك بنجاح!' : 'Reservation Request Dispatched!'}
            </h2>
            <div className="p-5 bg-[#0d0f12] rounded-xl border border-[#232c3a] max-w-sm mx-auto text-center space-y-1">
              <div className="text-xs text-zinc-400">{isAr ? 'كود قسيمة الحجز:' : 'Booking Voucher Code:'}</div>
              <div className="text-3xl font-black text-[#e4a74e] font-mono tracking-wider">
                {confirmedVoucher}
              </div>
              <div className="text-[11px] text-zinc-500 pt-1">
                {isAr ? 'تم إرسال البيانات لإدارة استقبال المطعم عبر الواتساب' : 'Sent to reception staff via WhatsApp'}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              {isAr
                ? 'فريق استقبال مطعم الطيب بفرع دله في انتظار تشريفكم. سيتواصل معكم مسؤول الاستقبال قبل موعدكم للتأكيد النهائي.'
                : 'El-Tayeb reception staff at Dalla tower awaits your visit. We will call you prior to arrival.'}
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setConfirmedVoucher(null)}
                className="px-6 py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors"
              >
                {isAr ? 'عمل حجز آخر' : 'Book Another Table'}
              </button>
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="px-5 py-3 bg-[#1e2531] text-zinc-300 hover:text-white rounded-xl text-sm font-bold border border-[#2a3443] flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#e4a74e]" />
                <span>{isAr ? 'اتصال بالاستقبال' : 'Call Reception'}</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-[#141820] border border-[#2b3545] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seating Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-white block">
                  {isAr ? '1. اختر نوع الجلسة المفضلة:' : '1. Select Preferred Seating:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingType(opt.id as any)}
                      className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                        seatingType === opt.id
                          ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white shadow-md'
                          : 'border-[#263141] bg-[#161c26] text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-white">{opt.title}</span>
                        <span className="text-[10px] text-[#e4a74e] bg-[#e4a74e]/10 px-2 py-0.5 rounded font-bold border border-[#e4a74e]/30">
                          {opt.badge}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 leading-snug">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests, Date, Time */}
              <div className="space-y-3 pt-2 border-t border-[#222a38]">
                <label className="text-sm font-bold text-white block">
                  {isAr ? '2. الموعد وعدد الأفراد:' : '2. Date, Time & Party Size:'}
                </label>
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
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-[#222a38]">
                <label className="text-sm font-bold text-white block">
                  {isAr ? '3. بيانات صاحب الحجز للتأكيد:' : '3. Contact Information:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'الاسم الكريم' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isAr ? 'مثال: أ. محمود الفيومي' : 'Your name'}
                      className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'رقم الهاتف للتواصل' : 'Phone Number'}
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

                <div>
                  <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                    {isAr ? 'ملاحظات خاصة (تجهيز صواني الطيب مسبقاً، مناسبة خاصة، مقاعد أطفال):' : 'Special requests / notes:'}
                  </label>
                  <input
                    type="text"
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder={isAr ? 'مثال: نرجو تجهيز صينية ملوك مشويات قبل وصولنا بربع ساعة' : 'Optional notes'}
                    className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#e4a74e] to-[#c68e3f] hover:from-[#f0be65] hover:to-[#d09439] text-zinc-950 font-black rounded-xl text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c68e3f]/25"
                >
                  <Send className="w-5 h-5" />
                  <span>{isAr ? 'تأكيد الحجز الفوري وإصدار التذكرة' : 'Confirm & Generate Booking Ticket'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
