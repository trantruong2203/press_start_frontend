import { TextField } from '@mui/material';

interface PoolsStepProps {
  keyPool: string;
  accountPool: string;
  setKeyPool: (text: string) => void;
  setAccountPool: (text: string) => void;
}

export default function PoolsStep({ keyPool, accountPool, setKeyPool, setAccountPool }: PoolsStepProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">🔑 Thêm Key & Account Pool</h3>
        <p className="text-gray-400 mb-6">Nhập các key và account để bán (tùy chọn)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-cyan-400 font-bold text-xl mb-2">🔑 Key Pool</h4>
            <p className="text-gray-400 text-sm">Mỗi dòng một key</p>
          </div>
          <TextField
            label="Nhập các key game..."
            value={keyPool}
            onChange={(e) => setKeyPool(e.target.value)}
            multiline
            minRows={8}
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
                fontFamily: 'monospace',
              }
            }}
          />
          <div className="text-xs text-gray-500 text-center">
            💡 Ví dụ: ABC123-DEF456-GHI789
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-purple-400 font-bold text-xl mb-2">👤 Account Pool</h4>
            <p className="text-gray-400 text-sm">Mỗi dòng một account (username|password)</p>
          </div>
          <TextField
            label="Nhập các account..."
            value={accountPool}
            onChange={(e) => setAccountPool(e.target.value)}
            multiline
            minRows={8}
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
              '& .MuiInputLabel-root': {
                color: '#8b5cf6',
                fontWeight: '600',
              },
              '& .MuiInputBase-input': {
                color: '#ffffff',
                fontFamily: 'monospace',
              }
            }}
          />
          <div className="text-xs text-gray-500 text-center">
            💡 Ví dụ: username123|password456
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-6 max-w-2xl mx-auto">
        <div className="text-center">
          <h4 className="text-yellow-400 font-bold text-lg mb-2">⚠️ Lưu ý quan trọng</h4>
          <p className="text-gray-300 text-sm">
            Các key và account sẽ được lưu trữ an toàn. Bạn có thể để trống nếu chưa có sẵn.
          </p>
        </div>
      </div>
    </div>
  );
}


