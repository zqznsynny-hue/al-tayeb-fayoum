import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Send, Phone, MapPin, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export interface CartItem {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  quantity: number;
  selectedWeight?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  language: 'ar' | 'en';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  language,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dinein'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isOpen) return null;

  const isAr = language === 'ar';

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === 'delivery' ? 30 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    let orderSummaryText = isAr
      ? `*طلب جديد من موقع مطعم الطيب (الفيوم)*\n`
      : `*New Order from El-Tayeb Restaurant (Fayoum)*\n`;

    orderSummaryText += isAr ? `━━━━━━━━━━━━━━━\n` : `━━━━━━━━━━━━━━━\n`;
    orderSummaryText += isAr
      ? `نوع الطلب: ${orderType === 'delivery' ? 'توصيل للمنزل' : orderType === 'takeaway' ? 'استلام بالسيارة / سفري' : 'تناول داخل المطعم'}\n`
      : `Type: ${orderType}\n`;

    if (customerName) {
      orderSummaryText += isAr ? `الاسم: ${customerName}\n` : `Name: ${customerName}\n`;
    }
    if (customerPhone) {
      orderSummaryText += isAr ? `الهاتف: ${customerPhone}\n` : `Phone: ${customerPhone}\n`;
    }
    if (orderType === 'delivery' && deliveryAddress) {
      orderSummaryText += isAr ? `العنوان: ${deliveryAddress}\n` : `Address: ${deliveryAddress}\n`;
    }

    orderSummaryText += isAr ? `\n*تفاصيل الأصناف:*\n` : `\n*Items:*\n`;
    items.forEach((item, idx) => {
      orderSummaryText += `${idx + 1}. ${isAr ? item.name : item.nameEn} ${item.selectedWeight ? `(${item.selectedWeight})` : ''} × ${item.quantity} = ${item.price * item.quantity} ج.م\n`;
    });

    orderSummaryText += isAr ? `\nالمجموع الفرعي: ${subtotal} ج.م\n` : `\nSubtotal: ${subtotal} EGP\n`;
    if (deliveryFee > 0) {
      orderSummaryText += isAr ? `خدمة التوصيل: ${deliveryFee} ج.م\n` : `Delivery: ${deliveryFee} EGP\n`;
    }
    orderSummaryText += isAr ? `*الإجمالي المطلوب: ${grandTotal} جنيه مصري*\n` : `*Grand Total: ${grandTotal} EGP*\n`;

    if (orderNotes) {
      orderSummaryText += isAr ? `ملاحظات خاصة: ${orderNotes}\n` : `Notes: ${orderNotes}\n`;
    }

    const waUrl = `https://wa.me/${RESTAURANT_INFO.phoneClean}?text=${encodeURIComponent(orderSummaryText)}`;
    window.open(waUrl, '_blank');
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg bg-[#12161e] h-full shadow-2xl flex flex-col justify-between border-l border-[#273242] text-right">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#212937] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e4a74e]" />
            <h3 className="text-lg font-bold text-white font-['Cairo']">
              {isAr ? 'سلة الطلبات' : 'Your Order Bag'}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">({items.length} {isAr ? 'أصناف' : 'items'})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#1a202c]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {orderSuccess ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white font-['Cairo']">
                {isAr ? 'تم إرسال طلبك بنجاح للواتساب!' : 'Order Dispatched to WhatsApp!'}
              </h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                {isAr
                  ? 'جاري تأكيد الأوردر مع مطبخ مطعم الطيب بالفيوم لتجهيز أشهى المشويات.'
                  : 'Our kitchen team at El-Tayeb Fayoum is reviewing your feast.'}
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-14 h-14 bg-[#181e28] text-zinc-500 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-zinc-300">
                {isAr ? 'سلة الطلبات فارغة حالياً' : 'Your bag is empty'}
              </p>
              <p className="text-xs text-zinc-500">
                {isAr ? 'تصفح المشويات والطواجن وأضف أطباقك المفضلة' : 'Explore grills & tagines to add items'}
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-[#e4a74e] text-zinc-950 text-xs font-bold rounded-lg"
              >
                {isAr ? 'تصفح قائمة الطعام' : 'Browse Menu'}
              </button>
            </div>
          ) : (
            <>
              {/* Itemized List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedWeight || 'default'}`}
                    className="p-3.5 bg-[#171d27] rounded-xl border border-[#263140] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-bold text-white font-['Cairo']">
                        {isAr ? item.name : item.nameEn}
                      </div>
                      {item.selectedWeight && (
                        <div className="text-[11px] text-[#e4a74e] font-medium">
                          {item.selectedWeight}
                        </div>
                      )}
                      <div className="text-xs font-black text-white tabular-nums mt-1 font-['Plus_Jakarta_Sans']">
                        {item.price * item.quantity} <span className="text-[#e4a74e] font-bold text-[11px]">{isAr ? 'ج.م' : 'EGP'}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 bg-[#0f1218] px-2 py-1 rounded-lg border border-[#212836]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white tabular-nums px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1.5 transition-colors"
                      title={isAr ? 'حذف' : 'Remove'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Type Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-zinc-300 block">
                  {isAr ? 'اختر طريقة الاستلام:' : 'Fulfillment Method:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      orderType === 'delivery'
                        ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white'
                        : 'border-[#263140] bg-[#161c26] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'توصيل للمنزل' : 'Delivery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      orderType === 'takeaway'
                        ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white'
                        : 'border-[#263140] bg-[#161c26] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'استلام بالسيارة' : 'Takeaway'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      orderType === 'dinein'
                        ? 'border-[#e4a74e] bg-[#e4a74e]/10 text-white'
                        : 'border-[#263140] bg-[#161c26] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isAr ? 'داخل الصالة' : 'Dine-in'}
                  </button>
                </div>
              </div>

              {/* Customer Info Form */}
              <form id="cart-form" onSubmit={handleSendWhatsAppOrder} className="space-y-3 pt-2">
                <div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isAr ? 'اسم العميل الكاشير' : 'Your name'}
                    className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={isAr ? 'رقم الهاتف للتواصل' : 'Mobile Phone number'}
                    className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>

                {orderType === 'delivery' && (
                  <div>
                    <textarea
                      required
                      rows={2}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder={isAr ? 'العنوان بالتفصيل في الفيوم (الشارع، رقم العمارة، الشقة)' : 'Delivery address in Fayoum'}
                      className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                    />
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder={isAr ? 'ملاحظات (عيش زيادة، طحينة، بدون بصل...)' : 'Special cooking instructions'}
                    className="w-full bg-[#161c26] border border-[#273242] rounded-lg p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#e4a74e]"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer with Totals & Checkout Button */}
        {items.length > 0 && !orderSuccess && (
          <div className="p-5 border-t border-[#212937] bg-[#10131a] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>{isAr ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                <span className="font-bold text-white tabular-nums font-['Plus_Jakarta_Sans']">{subtotal} {isAr ? 'ج.م' : 'EGP'}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>{isAr ? 'توصيل داخل الفيوم:' : 'Delivery fee:'}</span>
                  <span className="font-bold text-emerald-400 tabular-nums font-['Plus_Jakarta_Sans']">{deliveryFee} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-white pt-1.5 border-t border-[#1f2633]">
                <span>{isAr ? 'الإجمالي النهائي:' : 'Grand Total:'}</span>
                <span className="text-lg text-[#e4a74e] tabular-nums font-['Plus_Jakarta_Sans']">{grandTotal} {isAr ? 'جنيه مصري' : 'EGP'}</span>
              </div>
            </div>

            <button
              type="submit"
              form="cart-form"
              className="w-full py-3.5 bg-gradient-to-r from-[#e4a74e] to-[#c68e3f] hover:from-[#f0be65] hover:to-[#d09439] text-zinc-950 font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c68e3f]/20"
            >
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال الأوردر فوراً عبر الواتساب' : 'Submit Order via WhatsApp'}</span>
            </button>

            <div className="text-center">
              <a
                href={`tel:${RESTAURANT_INFO.phoneClean}`}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3 h-3 text-[#e4a74e]" />
                <span>{isAr ? `أو اتصل بنا مباشرة: ${RESTAURANT_INFO.phone}` : `Or call directly: ${RESTAURANT_INFO.phone}`}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
