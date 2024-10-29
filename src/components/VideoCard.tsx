import React from 'react';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import type { Video } from '../App';

type VideoCardProps = {
  video: Video;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

function VideoCard({ video, onApprove, onReject }: VideoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{video.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {video.uploadedBy}</span>
          <span>{video.uploadDate}</span>
        </div>

        <div className="flex items-center justify-between">
          {video.status === 'pending' ? (
            <>
              <button
                onClick={() => onApprove(video.id)}
                className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => onReject(video.id)}
                className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoCard;