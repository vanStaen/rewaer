// In-memory cache for picture URLs
// Structure: { "path_size_bucket": { url: string, timestamp: number } }
const pictureCache = new Map();

// Cache validity period in milliseconds (24 hours)
const CACHE_VALIDITY_PERIOD = 24 * 60 * 60 * 1000;

/**
 * Validates if a cached URL is still working by attempting to load the image
 * @param {string} url - The URL to validate
 * @returns {Promise<boolean>} - True if URL is valid, false otherwise
 */
const validateImageUrl = async (url) => {
  try {
    return await new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      // Set a timeout in case the image takes too long to load
      const timeout = setTimeout(() => {
        resolve(false);
      }, 5000);
      img.src = url;
      img.onload = () => {
        clearTimeout(timeout);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
    });
  } catch {
    return false;
  }
};

/**
 * Gets a picture URL with caching and validation
 * @param {string} path - The picture path
 * @param {string} bucket - The S3 bucket name
 * @param {string} size - The image size (t, m, b)
 * @returns {Promise<string>} - The picture URL
 */
export const getPictureUrl = async (path, bucket, size) => {
  try {
    // Create cache key
    const cacheKey = `${path}_${size}_${bucket}`;

    // Check if URL exists in cache and is still valid
    if (pictureCache.has(cacheKey)) {
      const cached = pictureCache.get(cacheKey);
      const now = Date.now();

      // If cache is still within validity period, validate and use if working
      if (now - cached.timestamp < CACHE_VALIDITY_PERIOD) {
        const isValid = await validateImageUrl(cached.url);
        if (isValid) {
          return cached.url;
        }
        // If invalid, remove from cache and refetch
        pictureCache.delete(cacheKey);
      } else {
        // Cache expired, remove it
        pictureCache.delete(cacheKey);
      }
    }

    // Fetch new URL from API
    const data = {
      path: `${path}_${size}`,
      bucket,
    };
    const endpoint = process.env.API_URL + "/upload/url";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    const url = responseJson.url;

    // Store in cache
    pictureCache.set(cacheKey, {
      url,
      timestamp: Date.now(),
    });

    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
