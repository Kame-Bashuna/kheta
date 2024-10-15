// "use client";
// import React, { useRef, useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const Camerapermission = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [cameraStarted, setCameraStarted] = useState(false);
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [responseMessage, setResponseMessage] = useState<string>('');
//   const [showResponsePage, setShowResponsePage] = useState<boolean>(false);
//   const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsSmallScreen(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   const startCamera = async () => {
//     try {
//       const newStream = await navigator.mediaDevices.getUserMedia({ 
//         video: { 
//           width: { ideal: 380 }, 
//           height: { ideal: 220 },
//           facingMode: isSmallScreen ? 'environment' : 'user'
//         } 
//       });
//       setStream(newStream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = newStream;
//         setCameraStarted(true);
//       }
//     } catch (err) {
//       console.error("Error accessing camera:", err);
//     }
//   };

//   const captureImage = async () => {
//     if (!cameraStarted) {
//       await startCamera();
//     }

//     await new Promise(resolve => setTimeout(resolve, 100));

//     if (canvasRef.current && videoRef.current) {
//       const context = canvasRef.current.getContext('2d');
//       if (context) {
//         canvasRef.current.width = videoRef.current.videoWidth;
//         canvasRef.current.height = videoRef.current.videoHeight;
//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
//         const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 1.0);
//         setCapturedImage(imageDataUrl);
//       }
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!capturedImage) {
//       setResponseMessage('Please capture an image first.');
//       return;
//     }

//     setIsProcessing(true);
//     const formData = new FormData();

//     const response = await fetch(capturedImage);
//     const blob = await response.blob();
//     formData.append('image_file', blob, 'captured_image.jpg');

//     try {
//       const apiResponse = await fetch('https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await apiResponse.json();

//       if (apiResponse.ok) {
//         const responseValue = Object.values(data)[0];
//         setResponseMessage(typeof responseValue === 'string' ? responseValue : JSON.stringify(responseValue));
//       } else {
//         setResponseMessage('Failed to upload the image');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       setResponseMessage('Something went wrong while uploading the image.');
//     } finally {
//       setIsProcessing(false);
//       setShowResponsePage(true);
//     }
//   };

//   const handleBack = () => {
//     setCapturedImage(null);
//     setCameraStarted(false);
//     setResponseMessage('');
//     setShowResponsePage(false);
//   };

//   const handleShare = () => {
//     console.log('Sharing response');
//   };

//   const handleReport = () => {
//     console.log('Report response');
//   };

//   useEffect(() => {
//     startCamera();
    
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [isSmallScreen]); 

//   const ResponsePage: React.FC = () => (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//       <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
//         <h2 className="text-2xl font-bold text-center">Upload Response</h2>
//         <p className="text-center">{responseMessage}</p>
//         <div className="flex justify-around mt-6">
//         <Link href="/pwa/share">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//             onClick={handleShare}
//           >
//             Share
//           </button>
//           </Link>
//           <Link href="/pwa/pharmacy">
//             <button
//               className="px-4 py-2 bg-red-500 text-white rounded-lg"
//               onClick={handleReport}
//             >
//               Report
//             </button>
//           </Link>
//         </div>
//         <button
//           className="w-full px-4 py-2 bg-gray-300 text-black rounded-lg"
//           onClick={handleBack}
//         >
//           Back to Upload
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div id='permission' className="min-h-screen bg-gray-100 flex flex-col">
//       <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
//         <div className="w-full max-w-3xl relative">
//           {isProcessing ? (
//             <div className="text-center">
//               <p className="mb-4">Processing...</p>
//               <div className="w-full h-2 bg-gray-200 rounded">
//                 <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
//               </div>
//             </div>
//           ) : capturedImage ? (
//             <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//               <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-2/3 rounded-lg shadow-lg space-y-6">
//                 <h2 className="text-2xl font-bold text-center">Captured Image</h2>
//                 <Image src={capturedImage} alt="Captured" className="w-64 h-64 object-cover rounded-lg mx-auto" width={0} height={0} />
//                 <div className="flex justify-around mt-6">
//                   <button
//                     className="px-4 py-2 bg-white text-black rounded-lg"
//                     onClick={handleBack}
//                   >
//                     Go Back
//                   </button>
//                   <button
//                     className="px-4 py-2 text-white rounded-lg"
//                     style={{ backgroundColor: '#1B264F' }}
//                     onClick={handleImageUpload}
//                   >
//                     {isProcessing ? 'Uploading...' : 'Upload'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <>
//               <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover mb-4 rounded-lg" />
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
//                 <button 
//                   onClick={captureImage}
//                   className="w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   <div className="w-12 h-12 bg-black rounded-full"></div>
//                 </button>
//               </div>
//             </>
//           )}
//           <canvas ref={canvasRef} style={{ display: 'none' }} width="1240" height="980" />
//         </div>
//       </main>

//       {showResponsePage && <ResponsePage />}
//     </div>
//   );
// };

// export default Camerapermission;





"use client";
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Camerapermission = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [showResponsePage, setShowResponsePage] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  // Detect if the user is on a mobile device
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Detect if the device is a mobile device
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setIsMobileDevice(true);
    } else {
      setIsMobileDevice(false);
    }
  }, []);

  // Start the camera with the appropriate facingMode
  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 380 },
          height: { ideal: 220 },
          facingMode: isMobileDevice ? { ideal: 'environment' } : { ideal: 'user' }, // Back for mobile, front for laptop
        },
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setCameraStarted(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = async () => {
    if (!cameraStarted) {
      await startCamera();
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg', 1.0);
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const handleImageUpload = async () => {
    if (!capturedImage) {
      setResponseMessage('Please capture an image first.');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();

    const response = await fetch(capturedImage);
    const blob = await response.blob();
    formData.append('image_file', blob, 'captured_image.jpg');

    try {
      const apiResponse = await fetch('https://bheta-solution-4f9d1da807f3.herokuapp.com/api/image-upload/', {
        method: 'POST',
        body: formData,
      });

      const data = await apiResponse.json();

      if (apiResponse.ok) {
        const responseValue = Object.values(data)[0];
        setResponseMessage(typeof responseValue === 'string' ? responseValue : JSON.stringify(responseValue));
      } else {
        setResponseMessage('Failed to upload the image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setResponseMessage('Something went wrong while uploading the image.');
    } finally {
      setIsProcessing(false);
      setShowResponsePage(true);
    }
  };

  const handleBack = () => {
    setCapturedImage(null);
    setCameraStarted(false);
    setResponseMessage('');
    setShowResponsePage(false);
  };

  const handleShare = () => {
    console.log('Sharing response');
  };

  const handleReport = () => {
    console.log('Report response');
  };

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isMobileDevice]);

  const ResponsePage: React.FC = () => (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center">Upload Response</h2>
        <p className="text-center">{responseMessage}</p>
        <div className="flex justify-around mt-6">
          <Link href="/pwa/share">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleShare}>
              Share
            </button>
          </Link>
          <Link href="/pwa/pharmacy">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleReport}>
              Report
            </button>
          </Link>
        </div>
        <button className="w-full px-4 py-2 bg-gray-300 text-black rounded-lg" onClick={handleBack}>
          Back to Upload
        </button>
      </div>
    </div>
  );

  return (
    <div id='permission' className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-3xl relative">
          {isProcessing ? (
            <div className="text-center">
              <p className="mb-4">Processing...</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div className="w-1/2 h-full bg-blue-600 rounded animate-pulse"></div>
              </div>
            </div>
          ) : capturedImage ? (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-10 w-3/4 md:w-1/2 lg:w-2/3 rounded-lg shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center">Captured Image</h2>
                <Image src={capturedImage} alt="Captured" className="w-64 h-64 object-cover rounded-lg mx-auto" width={0} height={0} />
                <div className="flex justify-around mt-6">
                  <button className="px-4 py-2 bg-white text-black rounded-lg" onClick={handleBack}>
                    Go Back
                  </button>
                  <button
                    className="px-4 py-2 text-white rounded-lg"
                    style={{ backgroundColor: '#1B264F' }}
                    onClick={handleImageUpload}
                  >
                    {isProcessing ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover mb-4 rounded-lg" />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <button
                  onClick={captureImage}
                  className="w-16 h-16 bg-white border-4 border-white rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <div className="w-12 h-12 bg-black rounded-full"></div>
                </button>
              </div>
            </>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} width="1240" height="980" />
        </div>
      </main>

      {showResponsePage && <ResponsePage />}
    </div>
  );
};

export default Camerapermission;

