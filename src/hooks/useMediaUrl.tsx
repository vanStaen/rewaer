import { useState, useEffect } from "react";
import { getPictureUrl } from "../helpers/picture/getPictureUrl";

interface UseMediaUrlReturn {
  mediaS3Url: string | null;
  mediaLoading: boolean;
  mediaError: Error | boolean;
}

export function useMediaUrl(
  mediaUrl: string | null | undefined,
  bucket: string,
  size?: 't' | 'm' | 'b' 
): [string | null, boolean, Error | boolean] {
  const [mediaS3Url, setMediaS3Url] = useState<string | null>(null);
  const [mediaLoading, setMediaLoading] = useState<boolean>(false);
  const [mediaError, setMediaError] = useState<Error | boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchMedia(): Promise<void> {
      setMediaLoading(true);
      setMediaS3Url(null);
      try {
        if (mediaUrl) {
          const url = await getPictureUrl(mediaUrl, bucket, size);
          await new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = reject;
          });
          if (isMounted) setMediaS3Url(url);
        }
      } catch (e) {
        console.log(e);
        if (isMounted) setMediaError(e as Error);
      }
      if (isMounted) setMediaLoading(false);
    }
    fetchMedia();
    return () => {
      isMounted = false;
    };
  }, [mediaUrl, bucket, size]);

  return [mediaS3Url, mediaLoading, mediaError];
}
