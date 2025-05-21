/**
 * Input validation utility for form fields
 */

type ValidationResult = {
    isValid: boolean;
    errorMessage: string;
  };
  
  /**
   * Validates if a string is a valid email address
   */
  export const validateEmail = (email: string): ValidationResult => {
    if (!email.trim()) {
      return { isValid: false, errorMessage: 'Ce champ est requis' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      errorMessage: emailRegex.test(email) ? '' : 'Veuillez entrer une adresse email valide',
    };
  };
  
  /**
   * Validates if a password meets minimum requirements
   * - At least 8 characters
   * - Contains at least one uppercase letter
   * - Contains at least one lowercase letter
   * - Contains at least one number
   */
  export const validatePassword = (password: string): ValidationResult => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    const isValid = minLength && hasUpperCase && hasLowerCase && hasNumber;
    
    let errorMessage = '';
    if (!isValid) {
      errorMessage = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
    }
    
    return { isValid, errorMessage };
  };
  
  /**
   * Validates if passwords match
   */
  export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
    return {
      isValid: password === confirmPassword,
      errorMessage: password === confirmPassword ? '' : 'Les mots de passe ne correspondent pas',
    };
  };
  
  /**
   * Validates if a string is not empty
   */
  export const validateRequired = (value: string): ValidationResult => {
    return {
      isValid: value.trim().length > 0,
      errorMessage: value.trim().length > 0 ? '' : 'Ce champ est requis',
    };
  };
  
  /**
   * Validates if a value is a number
   */
  export const validateNumber = (value: string): ValidationResult => {
    const isNumber = !isNaN(Number(value));
    return {
      isValid: isNumber,
      errorMessage: isNumber ? '' : 'Veuillez entrer un nombre valide',
    };
  };
  
  /**
   * Validates a phone number
   */
  export const validatePhone = (phone: string): ValidationResult => {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    return {
      isValid: phoneRegex.test(phone),
      errorMessage: phoneRegex.test(phone) ? '' : 'Veuillez entrer un numéro de téléphone valide',
    };
  };
  
  /**
   * General purpose validator that checks input against a specified type
   */
  export const validateInput = (value: string, type: 'email' | 'password' | 'text' | 'number' | 'phone'): ValidationResult => {
    switch (type) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'number':
        return validateNumber(value);
      case 'phone':
        return validatePhone(value);
      case 'text':
        return validateRequired(value);
      default:
        return {
          isValid: false,
          errorMessage: 'Type de validation inconnu',
        };
    }
  };