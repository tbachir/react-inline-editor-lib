/**
 * Utilitaires de validation sécurisée
 */

export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

export type ValidatorFunction = (value: string) => string | null;

/**
 * Classe utilitaire pour la validation des entrées
 */
export class ValidationUtils {
  /**
   * Valide la longueur d'une chaîne
   */
  static validateLength(
    value: string, 
    minLength?: number, 
    maxLength?: number
  ): ValidationResult {
    if (typeof value !== 'string') {
      return { isValid: false, error: 'Value must be a string' };
    }

    if (minLength !== undefined && value.length < minLength) {
      return { 
        isValid: false, 
        error: `Minimum ${minLength} character${minLength !== 1 ? 's' : ''} required` 
      };
    }

    if (maxLength !== undefined && value.length > maxLength) {
      return { 
        isValid: false, 
        error: `Maximum ${maxLength} character${maxLength !== 1 ? 's' : ''} allowed` 
      };
    }

    return { isValid: true };
  }

  /**
   * Valide un email
   */
  static validateEmail(value: string): ValidationResult {
    if (typeof value !== 'string') {
      return { isValid: false, error: 'Email must be a string' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }

    return { isValid: true };
  }

  /**
   * Valide qu'une valeur n'est pas vide
   */
  static validateRequired(value: string): ValidationResult {
    if (typeof value !== 'string') {
      return { isValid: false, error: 'Value must be a string' };
    }

    if (value.trim().length === 0) {
      return { isValid: false, error: 'This field is required' };
    }

    return { isValid: true };
  }

  /**
   * Valide une URL
   */
  static validateUrl(value: string): ValidationResult {
    if (typeof value !== 'string') {
      return { isValid: false, error: 'URL must be a string' };
    }

    try {
      new URL(value);
      return { isValid: true };
    } catch {
      return { isValid: false, error: 'Please enter a valid URL' };
    }
  }

  /**
   * Sanitise une chaîne en supprimant les caractères dangereux
   */
  static sanitizeString(value: string): string {
    if (typeof value !== 'string') return '';
    
    return value
      .replace(/[<>]/g, '') // Supprime les balises HTML de base
      .replace(/javascript:/gi, '') // Supprime les protocoles javascript
      .replace(/on\w+=/gi, '') // Supprime les gestionnaires d'événements
      .trim();
  }

  /**
   * Valide et sanitise une entrée utilisateur
   */
  static validateAndSanitize(
    value: string,
    validators: ValidatorFunction[] = []
  ): { value: string; error?: string } {
    // Sanitiser d'abord
    const sanitizedValue = this.sanitizeString(value);
    
    // Puis valider
    for (const validator of validators) {
      const error = validator(sanitizedValue);
      if (error) {
        return { value: sanitizedValue, error };
      }
    }

    return { value: sanitizedValue };
  }

  /**
   * Crée un validateur de longueur
   */
  static createLengthValidator(
    minLength?: number, 
    maxLength?: number
  ): ValidatorFunction {
    return (value: string) => {
      const result = this.validateLength(value, minLength, maxLength);
      return result.isValid ? null : result.error || 'Invalid length';
    };
  }

  /**
   * Crée un validateur requis
   */
  static createRequiredValidator(message = 'This field is required'): ValidatorFunction {
    return (value: string) => {
      const result = this.validateRequired(value);
      return result.isValid ? null : message;
    };
  }

  /**
   * Crée un validateur d'email
   */
  static createEmailValidator(message = 'Please enter a valid email address'): ValidatorFunction {
    return (value: string) => {
      const result = this.validateEmail(value);
      return result.isValid ? null : message;
    };
  }

  /**
   * Combine plusieurs validateurs
   */
  static combineValidators(...validators: ValidatorFunction[]): ValidatorFunction {
    return (value: string) => {
      for (const validator of validators) {
        const error = validator(value);
        if (error) return error;
      }
      return null;
    };
  }
}