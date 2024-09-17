"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import YouTube from 'react-youtube';

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti";

interface VideoPlayerProps {
 
  isLocked: boolean;
  videoId: string;
};

export const YouTubePlayer = ({

  isLocked,
  videoId
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  // Set up event handlers
  const onReady = (event: { target: any; }) => {
    // Access the player instance
    const player = event.target;

    // For example, you can automatically play the video
    player.playVideo();
  };

  const onError = (error: any) => {
    console.error('YouTube Player Error:', error);
  };

  return (
    <div className="relative aspect-video">
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
          este capitulo esta bloqueado
          </p>
        </div>
      )}
      {!isLocked && (
       <YouTube
       videoId={videoId}
       onReady={onReady}
       onError={onError}
     />
      )}
    </div>
  )
}