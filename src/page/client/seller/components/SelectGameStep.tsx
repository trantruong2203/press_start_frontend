import { Autocomplete, TextField } from '@mui/material';
import type { ProductResponse } from '../../../../interface/ProductResponse';

interface SelectGameStepProps {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  products: ProductResponse[];
  product: Partial<ProductResponse>;
  onSelect: (v: ProductResponse | null) => void;
  onClickAddNew: () => void;
  renderForm: () => React.ReactNode;
  renderCreateForm: () => React.ReactNode;
  activeAddGameForm: boolean;
}

export default function SelectGameStep({ status, products, product, onSelect, onClickAddNew, renderForm, renderCreateForm, activeAddGameForm }: SelectGameStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">🎮 Chọn Game</h3>
        <p className="text-gray-400 mb-6">Tìm và chọn game bạn muốn bán</p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <Autocomplete<ProductResponse, false, false, false>
          loading={status === 'loading'}
          value={product && product.id ? (product as ProductResponse) : null}
          onChange={(_, v) => onSelect(v)}
          options={products}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="🔍 Tìm kiếm Game" 
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
                '& .MuiInputLabel-root': {
                  color: '#06b6d4',
                  fontWeight: '600',
                },
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                }
              }}
            />
          )}
          sx={{ mb: 4 }}
        />
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 mb-4">Không tìm thấy game bạn muốn bán?</p>
        <button 
          onClick={onClickAddNew}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          ➕ Thêm Game Mới
        </button>
      </div>
      
      {/* Hiển thị AddGameForm dựa trên điều kiện */}
      {product?.id && renderForm()}
      {activeAddGameForm && renderCreateForm()}
    </div>
  );
}


