export interface MediaIdValue {
  mediaId: string;
  originalMediaId: string;
}

export type MediaIdInput = string | MediaIdValue | null | undefined;

export function getCurrentMediaId(mediaId: MediaIdInput): string {
  if (!mediaId) return "";
  return typeof mediaId === "string" ? mediaId : mediaId.mediaId;
}

export function getOriginalMediaId(mediaId: MediaIdInput): string {
  if (!mediaId) return "";
  if (typeof mediaId === "string") return mediaId;
  return mediaId.originalMediaId || mediaId.mediaId;
}

export function toMediaIdObject(mediaId: MediaIdInput): MediaIdValue {
  const currentMediaId = getCurrentMediaId(mediaId);
  const originalMediaId = getOriginalMediaId(mediaId);
  return {
    mediaId: currentMediaId,
    originalMediaId,
  };
}
