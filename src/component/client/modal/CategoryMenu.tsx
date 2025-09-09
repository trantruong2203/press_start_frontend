
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: '#1a1a2e',
  border: '2px solid #333',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: 'white',
  maxHeight: '80vh',
  overflow: 'auto',
};

const StyledButton = styled(Button)({
  color: 'white',
  border: '1px solid #333',
  borderRadius: '20px',
  padding: '8px 24px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#333',
    borderColor: '#555',
  },
});

const CategoryItem = styled(Typography)({
  color: 'white',
  fontSize: '14px',
  marginBottom: '8px',
  cursor: 'pointer',
  '&:hover': {
    color: '#a855f7',
  },
});

const BrandItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});

const BrandLogo = styled(Box)({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
});

const SearchItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '12px',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});

export default function CategoryMenu({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="category-modal-title"
    >
      <Box sx={style}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          {/* Categories Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ color: '#a855f7', fontWeight: 'bold', mb: 2 }}>
              Thể Loại
            </Typography>
            <Box sx={{ display: 'flex', gap: 6 }}>
              <Box sx={{ flex: 1 }}>
                <CategoryItem>Game Mới Ra Mắt</CategoryItem>
                <CategoryItem>List Game 29k</CategoryItem>
                <CategoryItem>Hành Động</CategoryItem>
                <CategoryItem>Phiêu Lưu</CategoryItem>
                <CategoryItem>Thể Thao</CategoryItem>
                <CategoryItem>Nhập Vai</CategoryItem>
              </Box>
              <Box sx={{ flex: 1 }}>
                <CategoryItem>Chiến Thuật</CategoryItem>
                <CategoryItem>Kinh Dị</CategoryItem>
                <CategoryItem>Giải Trí</CategoryItem>
                <CategoryItem>Giả Lập</CategoryItem>
                <CategoryItem>Thế Giới Mở</CategoryItem>
                <CategoryItem>Tay Cầm</CategoryItem>
              </Box>
            </Box>
          </Box>

          {/* Brands Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ color: '#a855f7', fontWeight: 'bold', mb: 2 }}>
              Thương hiệu
            </Typography>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#1b2838' }}>S</BrandLogo>
              <Typography>Steam</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#107c10' }}>X</BrandLogo>
              <Typography>Xbox</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#000' }}>U</BrandLogo>
              <Typography>Ubisoft</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#000' }}>EA</BrandLogo>
              <Typography>EA</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#e50914' }}>N</BrandLogo>
              <Typography>Netflix</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#00c4cc' }}>C</BrandLogo>
              <Typography>Canva</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#0078d4' }}>M</BrandLogo>
              <Typography>Microsoft</Typography>
            </BrandItem>
            <BrandItem>
              <BrandLogo sx={{ bgcolor: '#5865f2' }}>D</BrandLogo>
              <Typography>Discord</Typography>
            </BrandItem>
          </Box>

          {/* Popular Searches Column */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ color: '#a855f7', fontWeight: 'bold', mb: 2 }}>
              Tìm kiếm nhiều
            </Typography>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#1b2838' }}>S</BrandLogo>
              <Typography>Game steam</Typography>
            </SearchItem>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#107c10' }}>X</BrandLogo>
              <Typography>Xbox game pass</Typography>
            </SearchItem>
            <SearchItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: '40px', height: '24px', bgcolor: '#22c55e', borderRadius: '4px' }} />
                <Typography sx={{ color: '#22c55e' }}>Tài khoản Steam nhiều game</Typography>
              </Box>
            </SearchItem>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#e50914' }}>N</BrandLogo>
              <Typography>Netflix</Typography>
            </SearchItem>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#ff0000' }}>Y</BrandLogo>
              <Typography>Youtube premium</Typography>
            </SearchItem>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#0078d4' }}>M</BrandLogo>
              <Typography>Key win bản quyền</Typography>
            </SearchItem>
            <SearchItem>
              <BrandLogo sx={{ bgcolor: '#000' }}>EA</BrandLogo>
              <Typography>Game ea sport</Typography>
            </SearchItem>
          </Box>
        </Box>

        <Divider sx={{ bgcolor: '#444', my: 3 }} />

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <StyledButton>Tài khoản</StyledButton>
          <StyledButton>Giỏ hàng</StyledButton>
        </Box>
      </Box>
    </Modal>
  );
}
