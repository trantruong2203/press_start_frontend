import { useContext, useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
//
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store/store';
import { getAllProductsThunk, createProductThunk } from '../../../features/production/ProductThucks';
import type { ProductResponse } from '../../../interface/ProductResponse';
import { createSellerThunk } from '../../../features/seller/SellerThunk';
import type { CreateSellerRequest } from '../../../interface/SellerResponse';
import { ContextAuth } from '../../../contexts/AuthContext';
import { getOjectByEmail } from '../../../services/FunctionRepone';
import { handleChange as handleChangeSeller } from '../../../features/seller/SellerSlice';
import { createKeyPoolThunk } from '../../../features/key_pool/KeyPoolThunks';
import { createAccountPoolThunk } from '../../../features/account_pool/AccountPoolThunks';
import { setProduct, resetProduct } from '../../../features/production/ProductSlice';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import AddGameForm from '../../../component/client/AddGameForm';
import SelectGameStep from './components/SelectGameStep';
import PriceStep from './components/PriceStep';
import PoolsStep from './components/PoolsStep';
import NavigationButtons from './components/NavigationButtons';

const steps = ['Chọn Game', 'Thêm giá bán', 'Thêm thông tin'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, product } = useSelector((state: RootState) => state.product);
  const sellerState = useSelector((state: RootState) => state.seller.seller);
  const { accountLogin } = useContext(ContextAuth);
  // Nhập nhiều dòng nên vẫn giữ local state cho pool text
  const [keyPool, setKeyPool] = useState<string>('');
  const [accountPool, setAccountPool] = useState<string>('');
  const { users } = useSelector((state: RootState) => state.users);
  const [activeAddGameForm, setActiveAddGameForm] = useState(false);
  const [isAddNewGame, setIsAddNewGame] = useState(false);
  

  useEffect(() => {
    if (!products || products.length === 0 && status === 'idle') {
      dispatch(getAllProductsThunk());
    }
  }, [dispatch, products, status]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    // validate per step
    if (activeStep === 0) {
      if (!product.id && !activeAddGameForm) {
        toast.error('Vui lòng chọn game hoặc tạo game mới');
        return;
      }
      if (activeAddGameForm && !product.name?.trim()) {
        toast.error('Vui lòng nhập tên game');
        return;
      }
    }
    if (activeStep === 1) {
      const p = Number(sellerState.price_original);
      const d = Number(sellerState.discount || 0);
      const s = Number(sellerState.stock);
      if (Number.isNaN(p) || p <= 0) {
        toast.error('Giá bán phải > 0');
        return;
      }
      if (Number.isNaN(d) || d < 0 || d >= 100) {
        toast.error('Giảm giá phải từ 0 đến < 100');
        return;
      }
      if (Number.isNaN(s) || s < 0) {
        toast.error('Tồn kho phải >= 0');
        return;
      }
    }
    if (activeStep === 2) {
      // cho phép trống 2 pool
    }

    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    dispatch(resetProduct());
    dispatch(handleChangeSeller({ product_id: 0 }));
  };

  const onSelect = (v) => {
    if (v) {
      dispatch(setProduct(v));
      dispatch(handleChangeSeller({ product_id: v.id }));
      setIsAddNewGame(false);
      setActiveAddGameForm(false); // Reset activeAddGameForm khi chọn game cũ
    } else {
      dispatch(resetProduct());
      dispatch(handleChangeSeller({ product_id: 0 }));
      setIsAddNewGame(false);
      setActiveAddGameForm(false); // Reset activeAddGameForm khi bỏ chọn
    }
  };

  const onClickAddNew = () => {
    dispatch(resetProduct());
    setActiveAddGameForm(true);
    setIsAddNewGame(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse">
            🎮 Tạo Seller Game
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Bán game của bạn một cách chuyên nghiệp
          </p>
        </div>

        {/* Neon Stepper */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
          <Stepper 
            nonLinear 
            activeStep={activeStep}
            sx={{
              '& .MuiStepLabel-root': {
                '& .MuiStepLabel-label': {
                  color: '#e2e8f0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  '&.Mui-active': {
                    color: '#06b6d4',
                    textShadow: '0 0 10px #06b6d4',
                  },
                  '&.Mui-completed': {
                    color: '#8b5cf6',
                    textShadow: '0 0 10px #8b5cf6',
                  }
                }
              },
              '& .MuiStepConnector-root': {
                '& .MuiStepConnector-line': {
                  borderColor: '#374151',
                  borderWidth: '2px',
                },
                '&.Mui-active .MuiStepConnector-line': {
                  borderColor: '#06b6d4',
                  boxShadow: '0 0 10px #06b6d4',
                },
                '&.Mui-completed .MuiStepConnector-line': {
                  borderColor: '#8b5cf6',
                  boxShadow: '0 0 10px #8b5cf6',
                }
              },
              '& .MuiStepIcon-root': {
                color: '#374151',
                fontSize: '2rem',
                '&.Mui-active': {
                  color: '#06b6d4',
                  filter: 'drop-shadow(0 0 10px #06b6d4)',
                },
                '&.Mui-completed': {
                  color: '#8b5cf6',
                  filter: 'drop-shadow(0 0 10px #8b5cf6)',
                }
              }
            }}
          >
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton 
                  onClick={handleStep(index)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(6, 182, 212, 0.1)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                    }
                  }}
                >
                  <span className="text-lg font-semibold">{label}</span>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </div>
        {/* Main Content */}
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
          {allStepsCompleted() ? (
            <div className="text-center">
              <div className="mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                  Hoàn thành!
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Bạn đã tạo seller thành công. Game của bạn đã sẵn sàng để bán!
                </p>
              </div>
              <button 
                onClick={handleReset}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                🔄 Tạo Seller Mới
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  Bước {activeStep + 1}: {steps[activeStep]}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
              </div>
              
              {activeStep === 0 && (
                <SelectGameStep
                  status={status}
                  products={products}
                  product={product}
                  onSelect={onSelect}
                  onClickAddNew={onClickAddNew}
                  renderForm={() => (
                    <div className="mt-8">
                      <AddGameForm selectedProduct={product as ProductResponse} isAddNewGame={isAddNewGame} />
                    </div>
                  )}
                  renderCreateForm={() => (
                    <div className="mt-8">
                      <AddGameForm 
                        selectedProduct={product as ProductResponse}
                        isAddNewGame={isAddNewGame}
                      />
                    </div>
                  )}
                  activeAddGameForm={activeAddGameForm}
                />
              )}
              {Number(activeStep) === 1 && (
                <PriceStep
                  sellerState={{
                    price_original: sellerState.price_original || '',
                    discount: sellerState.discount || '',
                    stock: sellerState.stock || '',
                  }}
                  onChangePrice={(v) => dispatch(handleChangeSeller({ price_original: v }))}
                  onChangeDiscount={(v) => dispatch(handleChangeSeller({ discount: v }))}
                  onChangeStock={(v) => dispatch(handleChangeSeller({ stock: v }))}
                />
              )}
              {activeStep === 2 && (
                <PoolsStep
                  keyPool={keyPool}
                  accountPool={accountPool}
                  setKeyPool={setKeyPool}
                  setAccountPool={setAccountPool}
                />
              )}
              {/* Navigation Buttons */}
              <NavigationButtons
                activeStep={activeStep}
                steps={steps}
                onBack={handleBack}
                onCompleteStep={handleComplete}
                onFinish={async () => {
                  if (!product?.id && !activeAddGameForm) {
                    toast.error('Thiếu game');
                    return;
                  }
                  if (activeAddGameForm && !product?.name?.trim()) {
                    toast.error('Vui lòng nhập tên game');
                    return;
                  }
                  const p = Number(sellerState.price_original);
                  const d = Number(sellerState.discount || 0);
                  const s = Number(sellerState.stock);
                  if (Number.isNaN(p) || p <= 0) {
                    toast.error('Giá bán phải > 0');
                    return;
                  }
                  if (Number.isNaN(d) || d < 0 || d >= 100) {
                    toast.error('Giảm giá phải từ 0 đến < 100');
                    return;
                  }
                  if (Number.isNaN(s) || s < 0) {
                    toast.error('Tồn kho phải >= 0');
                    return;
                  }
                  const userId = getOjectByEmail(users, accountLogin?.email || '')?.id;                    
                  if (!userId) {
                    toast.error('Bạn cần đăng nhập để tạo seller');
                    return;
                  }
                  
                  let productId = product.id as number;
                  
                  // Nếu đang tạo game mới, cần tạo product trước
                  if (activeAddGameForm) {
                    try {
                      const newProduct = await dispatch(createProductThunk(product)).unwrap();
                      productId = newProduct.id;
                      toast.success('Tạo game thành công!');
                    } catch {
                      toast.error('Lỗi khi tạo game mới');
                      return;
                    }
                  }
                  const payload: CreateSellerRequest = {
                    user_id: userId,
                    product_id: productId,
                    price_original: p,
                    discount: d,
                    stock: s,
                    status: true,
                  };
                  try {
                    await dispatch(createSellerThunk(payload)).unwrap();

                    const keyLines = keyPool
                      .split(/\r?\n/)
                      .map((line) => line.trim())
                      .filter((line) => line.length > 0);
                  for (const key of keyLines) {
                    await dispatch(createKeyPoolThunk({
                      product_id: productId,
                      key_code: key,
                      status: true,
                      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    })).unwrap();
                  }

                    const accLines = accountPool
                      .split(/\r?\n/)
                      .map((line) => line.trim())
                      .filter((line) => line.length > 0);
                  for (const acc of accLines) {
                    const tokens = acc.split(/[|,:\s]+/).filter(Boolean);
                    const username = tokens[0] || '';
                    const password = tokens[1] || '';
                    await dispatch(createAccountPoolThunk({
                      product_id: productId,
                      username,
                      password,
                      status: true,
                    })).unwrap();
                  }

                    toast.success('Tạo seller + pool thành công');
                    setCompleted({ 0: true, 1: true, 2: true });
                    setActiveStep(steps.length);
                  } catch {
                    toast.error('Tạo seller hoặc pool thất bại');
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
