import React, { useState } from 'react';
import { X, User, Video } from 'lucide-react';
import AuthForm from './AuthForm';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (asCreator: boolean) => void;
};

type Step = 'role' | 'auth';

function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [step, setStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleRoleSelect = (asCreator: boolean) => {
    setSelectedRole(asCreator);
    setStep('auth');
  };

  const handleAuth = (email: string, password: string) => {
    // Simulate authentication - In production, replace with actual API call
    if (email === 'demo@example.com' && password === 'password') {
      onLogin(selectedRole);
      setStep('role');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleBack = () => {
    setStep('role');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {step === 'role' ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Account Type</h2>
            <div className="space-y-4">
              <button
                onClick={() => handleRoleSelect(true)}
                className="w-full flex items-center justify-center space-x-3 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Continue as Creator</span>
              </button>

              <button
                onClick={() => handleRoleSelect(false)}
                className="w-full flex items-center justify-center space-x-3 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span>Continue as Editor</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-6">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back
              </button>
              <h2 className="text-2xl font-bold text-gray-800">
                Sign in as {selectedRole ? 'Creator' : 'Editor'}
              </h2>
            </div>
            <AuthForm onSubmit={handleAuth} error={error} />
            <p className="mt-4 text-sm text-gray-500 text-center">
              Demo credentials: demo@example.com / password
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;