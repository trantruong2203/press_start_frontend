import { useMemo } from 'react';

function PaymentCancel() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const reason = params.get('reason') || params.get('message') || 'Bạn đã hủy thanh toán hoặc có lỗi xảy ra.';
  const orderCode = params.get('orderCode');

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', padding: 24 }}>
      <h2>Thanh toán bị hủy</h2>
      <p>{reason}</p>
      {orderCode && <p>Mã đơn hàng: <strong>{orderCode}</strong></p>}
      <a href="/">Tiếp tục mua sắm</a>
    </div>
  );
}

export default PaymentCancel;


