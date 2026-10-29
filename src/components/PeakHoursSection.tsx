import React, { useState } from 'react';
import { Clock, TrendingUp, Info, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PeakHoursSectionProps {
  language: 'ar' | 'en';
  onOpenReservation: () => void;
}

export const PeakHoursSection: React.FC<PeakHoursSectionProps> = ({ language, onOpenReservation }) => {
  const [selectedDay, setSelectedDay] = useState<'thursday' | 'friday' | 'weekdays'>('thursday');
  const [activeHourIndex, setActiveHourIndex] = useState<number | null>(5); // 9 PM by default

  const isAr = language === 'ar';

  const daysData = {
    thursday: RESTAURANT_INFO.peakHoursThursday,
    friday: [
      { time: '6ص', hour: 6, label: '6:00 AM', busyLevel: 0 },
      { time: '9ص', hour: 9, label: '9:00 AM', busyLevel: 10 },
      { time: '12م', hour: 12, label: '12:00 PM', busyLevel: 30 },
      { time: '2م', hour: 14, label: '2:00 PM', busyLevel: 85, isPeak: true },
      { time: '5م', hour: 17, label: '5:00 PM', busyLevel: 70 },
      { time: '8م', hour: 20, label: '8:00 PM', busyLevel: 95, isPeak: true },
      { time: '11م', hour: 23, label: '11:00 PM', busyLevel: 75 },
      { time: '2ص', hour: 2, label: '2:00 AM', busyLevel: 20 },
    ],
    weekdays: [
      { time: '6ص', hour: 6, label: '6:00 AM', busyLevel: 0 },
      { time: '9ص', hour: 9, label: '9:00 AM', busyLevel: 5 },
      { time: '12م', hour: 12, label: '12:00 PM', busyLevel: 20 },
      { time: '3م', hour: 15, label: '3:00 PM', busyLevel: 45 },
      { time: '6م', hour: 18, label: '6:00 PM', busyLevel: 55 },
      { time: '9م', hour: 21, label: '9:00 PM', busyLevel: 70 },
      { time: '12ص', hour: 0, label: '12:00 AM', busyLevel: 35 },
      { time: '2ص', hour: 2, label: '2:00 AM', busyLevel: 15 },
    ],
  };

  const currentData = daysData[selectedDay];

  return (
    <section id="peak-hours" className="py-16 bg-[#11141a] border-b border-[#1f2633] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#e4a74e] tracking-wider mb-2">
              {isAr ? 'أوقات الزحمة ومعدلات الإشغال' : 'Peak Hours & Wait Times'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'بيانات أوقات الزحمة وميزانية الفرد' : 'Peak Hours & Average Spending'}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            {isAr
              ? 'مستندة إلى إحصائيات جوجل ماب لمطعم الطيب لمساعدتك في اختيار أنسب وقت لتناول وجبتك دون انتظار.'
              : 'Grounded in verified Google Maps traffic data to help you pick the smoothest dining time.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Peak Hours Interactive Graph Card */}
          <div className="lg:col-span-7 bg-[#151922] rounded-2xl border border-[#252e3d] p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#212735]">
              {/* Day Segmented Tabs */}
              <div className="flex items-center gap-1 bg-[#0d0f12] p-1 rounded-lg border border-[#242b38]">
                <button
                  onClick={() => {
                    setSelectedDay('thursday');
                    setActiveHourIndex(5);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    selectedDay === 'thursday'
                      ? 'bg-[#e4a74e] text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'أيام الخميس' : 'Thursdays'}
                </button>
                <button
                  onClick={() => {
                    setSelectedDay('friday');
                    setActiveHourIndex(5);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    selectedDay === 'friday'
                      ? 'bg-[#e4a74e] text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'الجمعة' : 'Fridays'}
                </button>
                <button
                  onClick={() => {
                    setSelectedDay('weekdays');
                    setActiveHourIndex(5);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    selectedDay === 'weekdays'
                      ? 'bg-[#e4a74e] text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isAr ? 'باقي الأيام' : 'Weekdays'}
                </button>
              </div>

              {/* Live Status indicator from user prompt: "مباشر ليس مشغولاً" */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isAr ? 'مباشر: ليس مشغولاً الآن' : 'Live: Usually Not Busy Now'}</span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="space-y-2">
              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
                {currentData.map((item, index) => {
                  const isSelected = activeHourIndex === index;
                  const isPeak = item.busyLevel > 75;
                  return (
                    <button
                      key={item.time}
                      onClick={() => setActiveHourIndex(index)}
                      className="group flex-1 flex flex-col items-center h-full justify-end cursor-pointer focus:outline-none"
                    >
                      <div className="text-[10px] text-zinc-400 font-mono mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.busyLevel}%
                      </div>
                      <div
                        style={{ height: `${Math.max(item.busyLevel, 6)}%` }}
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#e4a74e] shadow-lg shadow-[#e4a74e]/30'
                            : isPeak
                            ? 'bg-amber-600/70 group-hover:bg-amber-500'
                            : 'bg-[#293242] group-hover:bg-[#38455a]'
                        }`}
                      />
                      <span
                        className={`text-xs mt-2 font-mono transition-colors ${
                          isSelected ? 'text-[#e4a74e] font-bold' : 'text-zinc-400'
                        }`}
                      >
                        {item.time}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="text-center text-xs text-zinc-500 pt-2 font-mono">
                {isAr
                  ? 'ساعات العمل اليومية من 11:00 صباحاً حتى 3:00 فجراً'
                  : 'Daily dining hours: 11:00 AM – 3:00 AM'}
              </div>
            </div>

            {/* Selected Hour Details */}
            {activeHourIndex !== null && currentData[activeHourIndex] && (
              <div className="p-4 rounded-xl bg-[#0f1218] border border-[#232b38] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#e4a74e]" />
                  <span className="text-white font-bold">
                    {currentData[activeHourIndex].label}
                  </span>
                  <span className="text-zinc-400">
                    {currentData[activeHourIndex].busyLevel > 80
                      ? (isAr ? '· وقت ذروة الزحمة المعتاد' : '· Peak rush hours')
                      : currentData[activeHourIndex].busyLevel > 40
                      ? (isAr ? '· زحمة معتدلة وطاولات متاحة' : '· Moderate activity')
                      : (isAr ? '· هدوء تام وخدمة فورية' : '· Very quiet and relaxed')}
                  </span>
                </div>
                <button
                  onClick={onOpenReservation}
                  className="text-[#e4a74e] hover:text-[#f0be65] font-bold underline"
                >
                  {isAr ? 'احجز لتجنب الانتظار' : 'Book ahead'}
                </button>
              </div>
            )}
          </div>

          {/* Average Spending & Price Distribution Card */}
          <div className="lg:col-span-5 bg-[#151922] rounded-2xl border border-[#252e3d] p-6 space-y-6">
            <div>
              <div className="text-xs text-zinc-400 font-semibold mb-1">
                {isAr ? 'متوسط تكلفة الوجبة' : 'Average Meal Cost'}
              </div>
              <div className="text-3xl font-black text-white tabular-nums font-['Plus_Jakarta_Sans']">
                {isAr ? RESTAURANT_INFO.priceRange : RESTAURANT_INFO.priceRangeEn}
                <span className="text-xs font-normal text-zinc-400 mr-2">
                  {isAr ? RESTAURANT_INFO.priceRangeNote : RESTAURANT_INFO.priceRangeNoteEn}
                </span>
              </div>
            </div>

            {/* Breakdown bars based on 58 ratings */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-zinc-300">
                {isAr ? 'توزيع إنفاق الزوار للشخص الواحد:' : 'Customer spending distribution:'}
              </div>

              {RESTAURANT_INFO.priceBreakdown.map((item) => (
                <div key={item.range} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-300 font-mono tabular-nums">
                      {isAr ? item.range : item.rangeEn}
                    </span>
                    <span className="text-zinc-400 text-[11px] tabular-nums">
                      {item.percentage}% ({item.count} {isAr ? 'صوت' : 'votes'})
                    </span>
                  </div>
                  <div className="h-2 w-full bg-[#0d0f12] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-full bg-gradient-to-r from-[#b37c2a] to-[#e4a74e] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Dining Tip */}
            <div className="p-3.5 bg-[#0f1218] rounded-xl border border-[#222a36] text-xs text-zinc-300 leading-relaxed space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#e4a74e]" />
                {isAr ? 'نصيحة الطيب لتجربة أسرع:' : 'Pro dining tip:'}
              </div>
              <p className="text-zinc-400">
                {isAr
                  ? 'يُنصح بالحجز المسبق عبر الواتساب أو الهاتف في أوقات ذروة مساء الخميس والجمعة لضمان تجهيز المشويات الطازجة بدون انتظار.'
                  : 'We recommend reserving your table or pre-ordering grills on Thursday and Friday nights to avoid rush delays.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
