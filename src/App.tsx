import React, { useState } from 'react';
import { Upload, CheckCircle2, XCircle, LogIn, Clock, Youtube } from 'lucide-react';
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard';
import LoginModal from './components/LoginModal';
import UploadForm from './components/UploadForm';
import YouTubeAuthModal from './components/YouTubeAuthModal';
import type { YouTubeCredentials } from './components/YouTubeAuthModal';

export type Video = {
  id: string;
  title: string;
  thumbnail: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadDate: string;
  description: string;
  videoFile?: File;
};

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [youtubeCredentials, setYoutubeCredentials] = useState<YouTubeCredentials | null>(null);
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Why React is Amazing in 2024',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
      status: 'pending',
      uploadedBy: 'John Editor',
      uploadDate: '2024-03-15',
      description: 'A deep dive into React\'s latest features and why it remains the top choice for web development.'
    },
    {
      id: '2',
      title: 'Advanced TypeScript Tips',
      thumbnail: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&auto=format&fit=crop&q=60',
      status: 'pending',
      uploadedBy: 'Sarah Editor',
      uploadDate: '2024-03-14',
      description: 'Exploring advanced TypeScript features that every developer should know.'
    }
  ]);

  const handleApprove = async (videoId: string) => {
    if (!youtubeCredentials) {
      setIsYouTubeModalOpen(true);
      return;
    }

    try {
      const video = videos.find(v => v.id === videoId);
      if (!video) return;

      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setVideos(videos.map(video => 
        video.id === videoId ? { ...video, status: 'approved' } : video
      ));

      alert('Video successfully uploaded to YouTube!');
    } catch (error) {
      console.error('Failed to upload to YouTube:', error);
      alert('Failed to upload video to YouTube. Please try again.');
    }
  };

  const handleReject = (videoId: string) => {
    setVideos(videos.map(video => 
      video.id === videoId ? { ...video, status: 'rejected' } : video
    ));
  };

  const handleLogin = (asCreator: boolean) => {
    setIsCreator(asCreator);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    
    if (asCreator && !youtubeCredentials) {
      setIsYouTubeModalOpen(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsCreator(false);
    setYoutubeCredentials(null);
  };

  const handleYouTubeAuth = (credentials: YouTubeCredentials) => {
    setYoutubeCredentials(credentials);
    setIsYouTubeModalOpen(false);
  };

  const handleUpload = (file: File, title: string, description: string) => {
    const newVideo: Video = {
      id: String(videos.length + 1),
      title,
      description,
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60',
      status: 'pending',
      uploadedBy: 'Current Editor',
      uploadDate: new Date().toISOString().split('T')[0],
      videoFile: file
    };

    setVideos([newVideo, ...videos]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          isCreator={isCreator} 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onLogout={handleLogout}
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to YT Approval Hub
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign in to access your dashboard
          </p>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </div>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isCreator={isCreator} 
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {isCreator ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Pending Approvals</h2>
                {!youtubeCredentials && (
                  <button
                    onClick={() => setIsYouTubeModalOpen(true)}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                    <span>Connect YouTube</span>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.status === 'pending').map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Previous Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.filter(v => v.status !== 'pending').map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <UploadForm onUpload={handleUpload} />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Recent Uploads</h3>
              <div className="space-y-4">
                {videos.map(video => (
                  <div key={video.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800">{video.title}</h4>
                        <p className="text-sm text-gray-500">Uploaded on {video.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {video.status === 'pending' && (
                        <span className="flex items-center text-yellow-500">
                          <Clock className="w-5 h-5 mr-1" />
                          Pending
                        </span>
                      )}
                      {video.status === 'approved' && (
                        <span className="flex items-center text-green-500">
                          <CheckCircle2 className="w-5 h-5 mr-1" />
                          Approved
                        </span>
                      )}
                      {video.status === 'rejected' && (
                        <span className="flex items-center text-red-500">
                          <XCircle className="w-5 h-5 mr-1" />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <YouTubeAuthModal
        isOpen={isYouTubeModalOpen}
        onClose={() => setIsYouTubeModalOpen(false)}
        onAuth={handleYouTubeAuth}
      />
    </div>
  );
}

export default App;