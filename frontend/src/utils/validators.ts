/**
 * Client-side validation helpers
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' };
  }
  
  return { valid: true };
}

export function validateName(name: string): ValidationResult {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Name is required' };
  }
  
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (trimmed.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }
  
  return { valid: true };
}

export function validatePhone(phone: string): ValidationResult {
  const trimmed = phone.trim();
  if (!trimmed) {
    return { valid: true }; // Phone is optional
  }
  
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid 10-digit phone number' };
  }
  
  return { valid: true };
}

export function validatePrice(price: number | string): ValidationResult {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(num)) {
    return { valid: false, error: 'Price must be a number' };
  }
  
  if (num < 0) {
    return { valid: false, error: 'Price cannot be negative' };
  }
  
  if (num > 10000) {
    return { valid: false, error: 'Price cannot exceed ₹10,000' };
  }
  
  return { valid: true };
}

export function validateQuantity(quantity: number, stock?: number): ValidationResult {
  if (!Number.isInteger(quantity)) {
    return { valid: false, error: 'Quantity must be a whole number' };
  }
  
  if (quantity < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }
  
  if (stock !== undefined && quantity > stock) {
    return { valid: false, error: `Only ${stock} items available` };
  }
  
  return { valid: true };
}

export function validateImageUrl(url: string): ValidationResult {
  const trimmed = url.trim();
  if (!trimmed) {
    return { valid: true }; // Image URL is optional
  }
  
  try {
    const parsed = new URL(trimmed);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'Image URL must use HTTP or HTTPS' };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'Please enter a valid URL' };
  }
}
