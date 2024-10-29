import React, { useState } from 'react';
import { X, Youtube, AlertCircle } from 'lucide-react';

type YouTubeAuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (credentials: YouTubeCredentials) => void;
};

export type YouTubeCredentials = {
  clientId: string;
  clientSecret: string;
};

function YouTubeAuthModal({ isOpen, onClose, onAuth }: YouTubeAuthModalProps) {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !clientSecret) {
      setError('Please fill in all fields');
      return;
    }
    onAuth({ clientId, clientSecret });
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

        <div className="flex items-center space-x-3 mb-6">
          <Youtube className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-800">Connect YouTube</h2>
        </div>

        <p className="text-gray-600 mb-6">
          To enable automatic video uploads, please provide your YouTube API credentials.
          You can get these from the Google Cloud Console.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Your YouTube API Client ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Secret
            </label>
            <input
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Your YouTube API Client Secret"
              required
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Connect YouTube Account
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          Your credentials are securely stored and only used for uploading approved videos.
        </p>
      </div>
    </div>
  );
}

export default YouTubeAuthModal;