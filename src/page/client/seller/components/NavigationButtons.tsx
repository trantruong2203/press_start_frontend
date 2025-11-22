interface NavigationButtonsProps {
  activeStep: number;
  steps: string[];
  onBack: () => void;
  onCompleteStep: () => void;
  onFinish: () => Promise<void> | void;
}

export default function NavigationButtons({ activeStep, steps, onBack, onCompleteStep, onFinish }: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-700">
      <button
        disabled={activeStep === 0}
        onClick={onBack}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
          activeStep === 0
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600 hover:scale-105 shadow-lg'
        }`}
      >
        ← Quay lại
      </button>

      <div className="flex space-x-4">
        {activeStep < steps.length - 1 && (
          <button 
            onClick={onCompleteStep}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
          >
            ✨ Hoàn thành bước
          </button>
        )}
        
        {activeStep === steps.length - 1 && (
          <button
            onClick={onFinish}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-green-500/50"
          >
            🚀 Hoàn thành
          </button>
        )}
      </div>
    </div>
  );
}


