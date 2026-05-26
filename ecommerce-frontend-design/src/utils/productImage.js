import placeholderImg from '../assets/Image/tech/8.png';

export function getProductImage(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return placeholderImg;
  }
  const trimmed = imageUrl.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return placeholderImg;
}

export function formatPrice(price) {
  if (price == null || Number.isNaN(Number(price))) {
    return '0.00';
  }
  return Number(price).toFixed(2);
}
