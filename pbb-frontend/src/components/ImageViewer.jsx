import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ImageViewer = ({ bookId, pageNumber, pageLabel }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  if (!bookId || !pageNumber) {
    return (
      <div className="w-full h-full bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">Select a page to view image</p>
          <p className="text-sm text-gray-400 mt-1">Choose a book and page from the left panel</p>
        </div>
      </div>
    );
  }

  const imagePath = `/pbb_book_pages/${bookId}/${pageNumber}.webp`;

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const closeFullscreen = () => {
    setFullscreen(false);
  };

  return (
    <>
      <div className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 px-3 py-2 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
             Image View from the Orginal Book for Page Label - {pageLabel || `Page ${pageNumber}`}
            </h3>
            <button
              onClick={toggleFullscreen}
              className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="View fullscreen"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative bg-gray-100 flex items-center justify-center">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner size="large" message="Loading image..." />
            </div>
          )}

          {imageError && !imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-lg font-medium mb-2">Image not found</p>
                <p className="text-sm text-gray-400">
                  {imagePath}
                </p>
              </div>
            </div>
          )}

          <img
            src={imagePath}
            alt={`Page ${pageNumber} of Book ${bookId}`}
            className={`w-full h-full object-contain transition-opacity duration-200 ${
              imageLoading || imageError ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ maxWidth: '98%', maxHeight: '98%' }}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>


      </div>

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-full max-h-full p-4">
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={imagePath}
              alt={`Page ${pageNumber} of Book ${bookId} - Fullscreen`}
              className="max-w-full max-h-full object-contain"
              onClick={closeFullscreen}
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              <p className="text-sm">
                {pageLabel || `Page ${pageNumber}`} - Book {bookId}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;