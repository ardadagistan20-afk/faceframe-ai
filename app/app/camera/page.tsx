"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Webcam from "react-webcam";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function CameraPage() {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setIsAnalyzing(true);
        
        // Mock analysis process with a 2-second delay
        setTimeout(() => {
          const mockResult = {
            face_shape: "Oval",
            confidence: 0.94,
            recommended_frames: ["Dikdörtgen", "Kelebek", "Geometrik"],
            image: imageSrc
          };
          localStorage.setItem("face_result", JSON.stringify(mockResult));
          router.push("/result");
        }, 2000);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f0f] text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="relative flex items-center justify-center p-6 pb-4">
        <button 
          onClick={() => router.push("/")}
          className="absolute left-6 p-2 -ml-2 text-white/80 hover:text-white transition-colors"
          disabled={isAnalyzing}
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-xl font-semibold tracking-wide">
          Yüzünüzü Ortalayın
        </h1>
      </div>

      {/* Camera Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="relative w-full max-w-[350px] aspect-square rounded-full overflow-hidden border-4 border-[#6C63FF]/30 shadow-2xl shadow-[#6C63FF]/20">
          {!capturedImage ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "user",
                aspectRatio: 1,
              }}
              className="absolute inset-0 w-full h-full object-cover"
              mirrored={true}
            />
          ) : (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="absolute inset-0 w-full h-full object-cover scale-x-[-1]" 
            />
          )}

          {/* Overlay Face Guide */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
             <svg viewBox="0 0 100 100" className="w-[60%] h-[75%] opacity-50">
               <ellipse 
                 cx="50" 
                 cy="50" 
                 rx="35" 
                 ry="45" 
                 fill="none" 
                 stroke="white" 
                 strokeWidth="1.5" 
                 strokeDasharray="4 4" 
               />
             </svg>
          </div>
        </div>
      </div>

      {/* Footer / Controls */}
      <div className="p-8 pb-12 flex justify-center items-center h-32">
        <button
          onClick={handleCapture}
          disabled={isAnalyzing || !!capturedImage}
          className="relative group disabled:opacity-50"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full scale-125 group-active:scale-110 transition-transform"></div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 relative z-10 transition-transform group-active:scale-95 border-[6px] border-[#0f0f0f]">
            {/* Inner circle effect */}
          </div>
        </button>
      </div>

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-[#0f0f0f]/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="relative mb-6">
             <div className="w-16 h-16 border-4 border-[#6C63FF]/20 border-t-[#6C63FF] rounded-full animate-spin"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="w-6 h-6 text-[#6C63FF]" />
             </div>
          </div>
          <h2 className="text-xl font-bold tracking-wider mb-2">Analiz ediliyor...</h2>
          <p className="text-gray-400 text-sm">Lütfen bekleyin</p>
        </div>
      )}
    </div>
  );
}
