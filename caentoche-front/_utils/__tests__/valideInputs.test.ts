import {
    validateEmail,
    validatePassword,
    validatePasswordMatch,
    validateRequired,
    validateNumber,
    validatePhone,
    validateInput,
  } from '../validateInput';
  
  describe('validateInput utility', () => {
    test('validateEmail should validate a correct email', () => {
      const result = validateEmail('test@example.com');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validateEmail should return an error for an invalid email', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer une adresse email valide');
    });
  
    test('validatePassword should validate a strong password', () => {
      const result = validatePassword('StrongP@ss1');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validatePassword should return an error for a weak password', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
      );
    });
  
    test('validatePasswordMatch should validate matching passwords', () => {
      const result = validatePasswordMatch('password123', 'password123');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validatePasswordMatch should return an error for non-matching passwords', () => {
      const result = validatePasswordMatch('password123', 'password456');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Les mots de passe ne correspondent pas');
    });
  
    test('validateRequired should validate a non-empty string', () => {
      const result = validateRequired('Non-empty');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validateRequired should return an error for an empty string', () => {
      const result = validateRequired('');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Ce champ est requis');
    });
  
    test('validateNumber should validate a valid number', () => {
      const result = validateNumber('123');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validateNumber should return an error for an invalid number', () => {
      const result = validateNumber('abc');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer un nombre valide');
    });
  
    test('validatePhone should validate a valid French phone number', () => {
      const result = validatePhone('+33612345678');
      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBe('');
    });
  
    test('validatePhone should return an error for an invalid phone number', () => {
      const result = validatePhone('12345');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer un numéro de téléphone valide');
    });
  
    test('validateInput should delegate to the correct validator based on type', () => {
      const emailResult = validateInput('test@example.com', 'email');
      expect(emailResult.isValid).toBe(true);
  
      const passwordResult = validateInput('StrongP@ss1', 'password');
      expect(passwordResult.isValid).toBe(true);
  
      const numberResult = validateInput('123', 'number');
      expect(numberResult.isValid).toBe(true);
  
      const phoneResult = validateInput('+33612345678', 'phone');
      expect(phoneResult.isValid).toBe(true);
  
      const textResult = validateInput('Non-empty', 'text');
      expect(textResult.isValid).toBe(true);
    });
  });

  describe('validateInput utility - Error cases', () => {
    test('validateEmail should return an error for an empty email', () => {
      const result = validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Ce champ est requis');
    });
  
    test('validateEmail should return an error for an invalid email format', () => {
      const result = validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer une adresse email valide');
    });
  
    test('validatePassword should return an error for a password that is too short', () => {
      const result = validatePassword('Short1');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
      );
    });
  
    test('validatePassword should return an error for a password missing a number', () => {
      const result = validatePassword('NoNumber!');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
      );
    });
  
    test('validatePasswordMatch should return an error for non-matching passwords', () => {
      const result = validatePasswordMatch('password123', 'differentPassword');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Les mots de passe ne correspondent pas');
    });
  
    test('validateRequired should return an error for an empty string', () => {
      const result = validateRequired('');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Ce champ est requis');
    });
  
    test('validateNumber should return an error for a non-numeric value', () => {
      const result = validateNumber('abc');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer un nombre valide');
    });
  
    test('validatePhone should return an error for an invalid phone number', () => {
      const result = validatePhone('12345');
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Veuillez entrer un numéro de téléphone valide');
    });
  
    test('validateInput should return an error for an unknown type', () => {
        const result = validateInput('value', 'unknown' as any);
        expect(result.isValid).toBe(false);
        expect(result.errorMessage).toBe('Type de validation inconnu');
      });
  });