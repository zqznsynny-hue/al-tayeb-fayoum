import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import { ReviewItem } from '../data/restaurantData';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReview: ReviewItem) => void;
  language: 'ar' | 'en';
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  language,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [author, setAuthor] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('تجربة');

  if (!isOpen) return null;

  const isAr = language === 'ar';

  const tagsList = ['تجربة', 'المكان', 'الاطفال', 'إدارة'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const colors = ['bg-amber-600', 'bg-emerald-600', 'bg-blue-600', 'bg-rose-600', 'bg-purple-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newRev: ReviewItem = {
      id: `custom-rev-${Date.now()}`,
      author: author.trim(),
      authorBadge: 'زائر مطعم الطيب · مراجعة موثقة',
      authorBadgeEn: 'El-Tayeb Visitor · Verified Review',
      reviewCount: 1,
      photoCount: 0,
      rating,
      timeAgo: 'الآن',
      timeAgoEn: 'Just now',
      comment: comment.trim(),
      commentEn: comment.trim(),
      tags: [selectedTag],
      likes: 1,
      avatarColor: randomColor,
    };

    onSubmit(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141820] border border-[#2b3545] rounded-2xl max-w-lg w-full p-6 text-right space-y-5 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-[#232b38] pb-4">
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1f2635]"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[11px] font-bold text-[#e4a74e]">
              {isAr ? 'تقييم زوار مطعم الطيب' : 'Diner Feedback'}
            </div>
            <h3 className="text-xl font-bold text-white font-['Cairo']">
              {isAr ? 'شارك تجربتك ورأيك في المطعم' : 'Write a Review'}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300 block">
              {isAr ? 'تقييمك للمطعم بالنجوم:' : 'Your star rating:'}
            </label>
            <div className="flex items-center gap-2 justify-end">
              {[1, 2, 3, 4, 5].map((starVal) => (
                <button
                  key={starVal}
                  type="button"
                  onClick={() => setRating(starVal)}
                  className="p-1 text-2xl transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      starVal <= rating
                        ? 'fill-[#e4a74e] text-[#e4a74e]'
                        : 'fill-zinc-800 text-zinc-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
              {isAr ? 'اسمك الكريم:' : 'Your Name:'}
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={isAr ? 'مثال: محمد الفيومي' : 'Your name'}
              className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
            />
          </div>

          {/* Topic Tag */}
          <div>
            <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
              {isAr ? 'تصنيف المراجعة:' : 'Category Tag:'}
            </label>
            <div className="flex items-center gap-2">
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedTag === tag
                      ? 'bg-[#e4a74e] text-zinc-950'
                      : 'bg-[#181e28] text-zinc-400 border border-[#263140]'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="text-xs font-bold text-zinc-300 mb-1.5 block">
              {isAr ? 'تعليقك وتفاصيل الوجبة والخدمة:' : 'Review details:'}
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={isAr ? 'اكتب رأيك في المشويات، الطواجن، الجلسات، أو سرعة التجهيز...' : 'Share what you loved about the meal and atmosphere...'}
              className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#e4a74e] hover:bg-[#d09439] text-zinc-950 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'نشر التقييم' : 'Post Review'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-[#1e2531] text-zinc-300 font-bold rounded-xl text-sm hover:text-white"
            >
              {isAr ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
