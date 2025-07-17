import { useState, useEffect } from "react";
import { getPictureUrl } from "../helpers/picture/getPictureUrl";

export function useMediaUrl(mediaUrl, bucket) {
  const [mediaS3Url, setMediaS3Url] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchMedia() {
      setMediaLoading(true);
      setMediaS3Url(null);
      try {
        if (mediaUrl) {
          const url = await getPictureUrl(mediaUrl, bucket);
          await new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = url;
            img.onload = resolve;
            img.onerror = reject;
          });
          if (isMounted) setMediaS3Url(url);
        }
      } catch (e) {
        console.log(e);
        setMediaError(e);
      }
      if (isMounted) setMediaLoading(false);
    }
    fetchMedia();
    return () => {
      isMounted = false;
    };
  }, [mediaUrl]);

  return [mediaS3Url, mediaLoading, mediaError];
}
