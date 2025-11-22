import { useMemo, useEffect, useState } from "react";
import { formatCurrency } from "../../services/FunctionRepone";

function PaymentSuccess() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const orderCode = params.get("orderCode");
  const amount = params.get("amount");
  const [orderStatus, setOrderStatus] = useState<string>("Đang xác nhận...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (orderCode) {
      const checkOrderStatus = async () => {
        try {
          const res = await fetch(`http://localhost:3000/orders/status/${orderCode}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status) {
              setOrderStatus("✅ Đã thanh toán thành công!");
              setIsVerified(true);
            } else {
              setOrderStatus("⏳ Đang chờ xác nhận thanh toán...");
            }
          }
        } catch (error) {
          console.error("Lỗi kiểm tra trạng thái đơn hàng:", error);
          setOrderStatus("❌ Không thể xác nhận trạng thái đơn hàng");
        }
      };
      
      checkOrderStatus();
    }
  }, [orderCode]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        {/* Icon thành công */}
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isVerified ? "Thanh toán thành công!" : "Đang xử lý..."}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {isVerified 
            ? "Đơn hàng của bạn đã được xác nhận và giỏ hàng đã được xóa." 
            : "Vui lòng chờ xác nhận từ hệ thống."
          }
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn hàng</h2>
          
          {orderCode && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Mã đơn hàng:</span>
              <span className="font-mono font-semibold text-blue-600">#{orderCode}</span>
            </div>
          )}
          
          {amount && (
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Tổng tiền:</span>
              <span className="font-semibold text-green-600">{formatCurrency(Number(amount))}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Trạng thái:</span>
            <span className={`font-semibold ${isVerified ? 'text-green-600' : 'text-yellow-600'}`}>
              {orderStatus}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Về trang chủ
          </a>
          
          <a 
            href="/orders" 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Xem đơn hàng
          </a>
        </div>

        {!isVerified && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.726-1.36 3.491 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Đang xử lý thanh toán</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Nếu thanh toán thành công, giỏ hàng của bạn sẽ được tự động xóa. 
                  Vui lòng đợi vài phút để hệ thống xác nhận.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;
