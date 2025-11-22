import { TextField } from '@mui/material';

interface PriceStepProps {
  sellerState: {
    price_original: number | string;
    discount?: number | string;
    stock?: number | string;
  };
  onChangePrice: (value: number) => void;
  onChangeDiscount: (value: number) => void;
  onChangeStock: (value: number) => void;
}

export default function PriceStep({ sellerState, onChangePrice, onChangeDiscount, onChangeStock }: PriceStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">💰 Thiết lập Giá Bán</h3>
        <p className="text-gray-400 mb-6">Nhập thông tin giá cả và tồn kho cho game</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <label className="text-cyan-400 font-semibold text-lg">💵 Giá bán (VNĐ)</label>
          <TextField
            type="number"
            value={sellerState.price_original}
            onChange={(e) => onChangePrice(Number(e.target.value))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#06b6d4',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-purple-400 font-semibold text-lg">🎯 Giảm giá (%)</label>
          <TextField
            type="number"
            value={sellerState.discount}
            onChange={(e) => onChangeDiscount(Number(e.target.value))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#8b5cf6',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#8b5cf6',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#8b5cf6',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
              }
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="text-pink-400 font-semibold text-lg">📦 Tồn kho</label>
          <TextField
            type="number"
            value={sellerState.stock}
            onChange={(e) => onChangeStock(Number(e.target.value))}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#ec4899',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#ec4899',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ec4899',
                  boxShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
                fontSize: '1.1rem',
                fontWeight: '600',
              }
            }}
          />
        </div>
      </div>

      {sellerState.price_original && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-center">
            <h4 className="text-green-400 font-bold text-lg mb-2">💰 Giá cuối cùng</h4>
            <div className="text-3xl font-bold text-white">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(
                Number(sellerState.price_original) * (1 - Number(sellerState.discount || 0) / 100)
              )}
            </div>
            {sellerState.discount && Number(sellerState.discount) > 0 && (
              <div className="text-sm text-gray-400 mt-2">
                Giảm {sellerState.discount}% từ {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(Number(sellerState.price_original))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


