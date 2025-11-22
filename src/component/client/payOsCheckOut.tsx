import  { useState, useEffect, useMemo, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getAllSellersThunk } from '../../features/seller/SellerThunk';
import type { AppDispatch } from '../../store/store';
import { getOjectByEmail } from '../../services/FunctionRepone';
import { ContextAuth } from '../../contexts/AuthContext';

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cartItems.cartItems);
  const sellers = useSelector((state: RootState) => state.seller.sellers);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const { accountLogin } = useContext(ContextAuth);
  const userId = getOjectByEmail(users, accountLogin?.email ?? "")?.id;

  useEffect(() => {
    if (!sellers || sellers.length === 0) {
      dispatch(getAllSellersThunk());
    }
  }, [dispatch, sellers]);

  const userCartItems = useMemo(() => {
    return cartItems.filter((item) => item.user_id === userId);
  }, [cartItems, userId]);

  const totalPrice = userCartItems.reduce(
    (acc, ci) =>
      acc +
      ci.quantity *
        (sellers.find((s) => s.product_id === ci.product_id)?.price_original ??
          0),
    0
  );

  

  const handleCheckout = async () => {
    try {
      setLoading(true);
      
      const configRes = await fetch('http://localhost:3000/payos/config');
      const configData = await configRes.json();
      
      if (!configData.configured) {
        throw new Error('PayOS chưa được cấu hình. Vui lòng liên hệ admin để setup PayOS.');
      }
      
      // 1. Tạo order trước
      const orderCode = Date.now();
      const orderRes = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyer_id: userId,
          order_code: orderCode.toString(),
          total: 2000,
          status: false, 
        }),
      });
      
      if (!orderRes.ok) {
        throw new Error('Tạo đơn hàng thất bại');
      }

      // 2. Tạo checkout link với thông tin thực tế
      const res = await fetch('http://localhost:3000/payos/checkout-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderCode: orderCode,
          amount: 2000,
          description: `Đơn hàng #${orderCode.toString().slice(-8)}`, 
          returnUrl: `${window.location.origin}/payment-success?orderCode=${orderCode}&amount=${2000}`, 
          cancelUrl: `${window.location.origin}/payment-cancel?orderCode=${orderCode}`,
        }),
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Tạo link thanh toán thất bại');

      const checkoutUrl = json?.data?.checkoutUrl || json?.data?.checkoutUrl || json?.data?.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('Không nhận được checkoutUrl');
      }
    } catch (err) {
      console.error('Payment error:', err);
      
      let errorMessage = 'Có lỗi khi tạo link thanh toán';
      
      if (err instanceof Error) {
        if (err.message.includes('PayOS chưa được cấu hình')) {
          errorMessage = 'PayOS chưa được cấu hình. Vui lòng liên hệ admin.';
        } else if (err.message.includes('Thiếu thông tin')) {
          errorMessage = 'Thiếu thông tin bắt buộc. Vui lòng thử lại.';
        } else if (err.message.includes('Mô tả không được vượt quá 25 ký tự')) {
          errorMessage = 'Mô tả đơn hàng quá dài. Vui lòng thử lại.';
        } else if (err.message.includes('Số tiền phải lớn hơn 0')) {
          errorMessage = 'Số tiền không hợp lệ. Vui lòng kiểm tra giỏ hàng.';
        } else {
          errorMessage = `Lỗi: ${err.message}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 transition-all duration-200 ease-in-out flex items-center justify-center space-x-2"
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Đang tạo link...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>Thanh toán</span>
        </>
      )}
    </button>
  );
};

export default PaymentButton;
