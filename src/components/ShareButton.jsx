import React, { useState } from 'react';
import { Share, Check } from 'lucide-react';

const ShareButton = ({ project }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title: project.title,
    text: `Check out ${project.title} - ${project.description}`,
    url: `${window.location.origin}${window.location.pathname}?id=${project.id}`
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={handleShare}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
      >
        {copied ? <Check className="w-5 h-5" /> : <Share className="w-5 h-5" />}
        {copied ? 'Copied!' : 'Share'}
      </button>

      {showNotification && (
        <div className="absolute top-10 right-0 w-64 p-3 bg-green-50 border border-green-200 rounded-lg shadow-lg">
          <p className="text-sm text-green-800">
            {navigator.share ? 'Shared successfully!' : 'Link copied to clipboard!'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShareButton;