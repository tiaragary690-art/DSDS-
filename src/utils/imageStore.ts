
const STORAGE_KEY = 'lt_image_overrides';

export const getImageOverride = (id: string): string | null => {
  const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  return overrides[id] || null;
};

export const setImageOverride = (id: string, base64: string) => {
  const overrides = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  overrides[id] = base64;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new Event('image-override-updated'));
};

export const clearImageOverrides = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('image-override-updated'));
};
