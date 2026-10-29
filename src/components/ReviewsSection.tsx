import React, { useState } from 'react';
import { Star, ThumbsUp, Award, User, PenTool, Send, MessageSquare, Check, Sparkles } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO, ReviewItem } from '../data/restaurantData';

interface ReviewsSectionProps {
  language: 'ar' | 'en';
  onOpenAddReview?: () => void;
  customReviews: ReviewItem[];
  onAddReview?: (newReview: ReviewItem) => void;
  isStandalonePage?: boolean;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  language,
  onOpenAddReview,
  customReviews,
  onAddReview,
  isStandalonePage = false,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('الكل');
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});

  // Inline Review Form state
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [authorName, setAuthorName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('تجربة');
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const isAr = language === 'ar';

  const topics = [
    { id: 'الكل', label: isAr ? 'الكل' : 'All', count: 341 },
    { id: 'تجربة', label: isAr ? 'تجربة' : 'Experience', count: 17 },
    { id: 'المكان', label: isAr ? 'المكان' : 'Ambiance', count: 5 },
    { id: 'الاطفال', label: isAr ? 'الاطفال' : 'Kids', count: 5 },
    { id: 'إدارة', label: isAr ? 'إدارة' : 'Management', count: 5 },
  ];

  const allReviewsList = [...customReviews, ...REVIEWS];

  const filteredReviews = allReviewsList.filter((rev) => {
    if (selectedTopic === 'الكل') return true;
    return rev.tags.includes(selectedTopic);
  });

  const toggleLike = (id: string, initialLikes: number) => {
    setLikedReviews((prev) => {
      const current = prev[id] !== undefined ? prev[id] : initialLikes;
      const isAlreadyLiked = prev[id] !== undefined && prev[id] > initialLikes;
      return {
        ...prev,
        [id]: isAlreadyLiked ? initialLikes : current + 1,
      };
    });
  };

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const colors = ['bg-amber-600', 'bg-emerald-600', 'bg-blue-600', 'bg-rose-600', 'bg-purple-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newRev: ReviewItem = {
      id: `custom-rev-${Date.now()}`,
      author: authorName.trim(),
      authorBadge: isAr ? 'زائر مطعم الطيب · تعليق موثق' : 'El-Tayeb Diner · Verified Review',
      authorBadgeEn: 'El-Tayeb Diner · Verified Review',
      reviewCount: 1,
      photoCount: 0,
      rating,
      timeAgo: isAr ? 'الآن' : 'Just now',
      timeAgoEn: 'Just now',
      comment: commentText.trim(),
      commentEn: commentText.trim(),
      tags: [selectedTag],
      likes: 1,
      avatarColor: randomColor,
    };

    if (onAddReview) {
      onAddReview(newRev);
    }
    setAuthorName('');
    setCommentText('');
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowInlineForm(false);
    }, 2500);
  };

  return (
    <section id="reviews" className="py-12 lg:py-20 bg-[#0d0f12] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section / Page Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-[#e4a74e] tracking-wider mb-2">
              {isAr ? 'صفحة تعليقات وآراء الزبائن' : 'Customer Reviews Page'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cairo']">
              {isAr ? 'مكان لتعليقات وتقييمات زوار مطعم الطيب' : 'Customer Reviews & Feedback'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              {isAr
                ? 'تقييمات موثقة من زوار المطعم على خرائط جوجل، ومساحة مخصصة لكتابة رأيك ومشاركتنا تجربتك.'
                : 'Verified reviews from Google Maps and an open space to share your dining impressions.'}
            </p>
          </div>

          <button
            onClick={() => setShowInlineForm(!showInlineForm)}
            className="px-5 py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 self-start md:self-auto shadow-md"
          >
            <PenTool className="w-4 h-4" />
            <span>{showInlineForm ? (isAr ? 'إغلاق نموذج التعليق' : 'Close Form') : (isAr ? 'اكتب تعليقك الآن' : 'Leave a Comment')}</span>
          </button>
        </div>

        {/* Inline Comment Writing Box for Customers */}
        {showInlineForm && (
          <div className="mb-10 bg-[#141820] border border-[#e4a74e]/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl text-right transition-all">
            <div className="flex items-center justify-between border-b border-[#242d3d] pb-3">
              <span className="text-xs font-bold text-zinc-400">
                {isAr ? 'اكتب تعليقك وسيظهر فوراً لجميع الزوار:' : 'Your review will be posted immediately:'}
              </span>
              <h3 className="text-base font-bold text-white font-['Cairo'] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e4a74e]" />
                <span>{isAr ? 'إضافة تعليق زبون جديد' : 'Write Customer Comment'}</span>
              </h3>
            </div>

            {submitSuccess ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{isAr ? 'شكراً لك! تم نشر تعليقك بنجاح في الموقع.' : 'Thank you! Your review was published.'}</span>
              </div>
            ) : (
              <form onSubmit={handleInlineSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-300">
                      {isAr ? 'تقييمك بالنجوم:' : 'Rating:'}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setRating(starVal)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-transform hover:scale-110 ${
                              starVal <= rating ? 'fill-[#e4a74e] text-[#e4a74e]' : 'fill-zinc-800 text-zinc-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-zinc-300">
                      {isAr ? 'تصنيف التجربة:' : 'Topic:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {['تجربة', 'المكان', 'الاطفال', 'إدارة'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTag(t)}
                          className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                            selectedTag === t
                              ? 'bg-[#e4a74e] text-zinc-950'
                              : 'bg-[#1b2230] text-zinc-400 border border-[#273243]'
                          }`}
                        >
                          #{t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'اسمك الكريم:' : 'Your Name:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={isAr ? 'مثال: أحمد الفيومي' : 'Your name'}
                      className="w-full bg-[#181f2c] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
                      {isAr ? 'تعليقك وتجربتك في مطعم الطيب:' : 'Your Comment:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={isAr ? 'رأيك في المشويات، الطواجن، الخدمة...' : 'Your feedback on the grills, tagines, service...'}
                      className="w-full bg-[#181f2c] border border-[#283446] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAr ? 'نشر التعليق فوراً' : 'Post Comment'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInlineForm(false)}
                    className="px-4 py-2.5 bg-[#1b2230] text-zinc-400 rounded-lg text-xs hover:text-white"
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Rating Breakdown Card */}
        <div className="bg-[#141820] rounded-2xl border border-[#232b39] p-6 sm:p-8 mb-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:text-right border-b md:border-b-0 md:border-l border-[#222937] pb-6 md:pb-0 md:pl-8">
            <div className="text-5xl font-black text-white tabular-nums tracking-tight font-['Plus_Jakarta_Sans']">
              4.1
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-[#e4a74e] my-2">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#e4a74e]" />
              ))}
              <Star className="w-5 h-5 fill-[#e4a74e]/40 text-[#e4a74e]" />
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              {isAr ? 'إجمالي عدد التعليقات: 341 مراجعة معتمدة' : 'Based on 341 verified reviews'}
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-8 space-y-2">
            {RESTAURANT_INFO.starBreakdown.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3 text-xs">
                <span className="w-5 text-zinc-400 font-bold tabular-nums">{bar.stars}</span>
                <Star className="w-3.5 h-3.5 fill-zinc-500 text-zinc-500 shrink-0" />
                <div className="flex-1 h-2 bg-[#0d0f12] rounded-full overflow-hidden">
                  <div
                    style={{ width: `${bar.percentage}%` }}
                    className="h-full bg-[#e4a74e] rounded-full"
                  />
                </div>
                <span className="w-10 text-left text-zinc-500 text-[11px] tabular-nums">
                  {bar.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Topic Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-bold text-zinc-500 ml-2 whitespace-nowrap">
            {isAr ? 'ترتيب بحسب الموضوع:' : 'Filter topics:'}
          </span>
          {topics.map((t) => {
            const active = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? 'bg-[#e4a74e] text-zinc-950 font-black'
                    : 'bg-[#151922] text-zinc-400 hover:text-white border border-[#262f3e]'
                }`}
              >
                <span>{t.label}</span>
                <span className="text-[11px] opacity-75 tabular-nums">({t.count})</span>
              </button>
            );
          })}
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const currentLikes =
              likedReviews[rev.id] !== undefined ? likedReviews[rev.id] : rev.likes;
            const isLiked = likedReviews[rev.id] !== undefined && likedReviews[rev.id] > rev.likes;

            return (
              <div
                key={rev.id}
                className="bg-[#141820] rounded-2xl border border-[#232b39] p-6 flex flex-col justify-between hover:border-[#333d4e] transition-colors text-right space-y-4"
              >
                <div>
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${rev.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow shrink-0`}
                      >
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-['Cairo']">
                          {rev.author}
                        </h4>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <Award className="w-3 h-3 text-[#e4a74e]" />
                          <span>{isAr ? rev.authorBadge : rev.authorBadgeEn}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars & Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center text-[#e4a74e]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#e4a74e]" />
                      ))}
                    </div>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {isAr ? rev.timeAgo : rev.timeAgoEn}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {isAr ? rev.comment : rev.commentEn}
                  </p>
                </div>

                {/* Card Footer: Tags & Likes */}
                <div className="pt-3 border-t border-[#1f2633] flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {rev.tags.map((tg) => (
                      <span key={tg} className="text-[11px] text-[#e4a74e]/80">
                        #{tg}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLike(rev.id, rev.likes)}
                      className={`flex items-center gap-1 hover:text-white transition-colors ${
                        isLiked ? 'text-[#e4a74e] font-bold' : 'text-zinc-400'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{currentLikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
