// Enterprise-grade validation utilities

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export class Validator {
  private errors: ValidationError[] = [];

  required(field: string, value: any, customMessage?: string): this {
    if (!value || (typeof value === 'string' && !value.trim())) {
      this.errors.push({
        field,
        message: customMessage || `${field} is required`,
        code: 'REQUIRED'
      });
    }
    return this;
  }

  minLength(field: string, value: string, min: number, customMessage?: string): this {
    if (value && value.length < min) {
      this.errors.push({
        field,
        message: customMessage || `${field} must be at least ${min} characters`,
        code: 'MIN_LENGTH'
      });
    }
    return this;
  }

  maxLength(field: string, value: string, max: number, customMessage?: string): this {
    if (value && value.length > max) {
      this.errors.push({
        field,
        message: customMessage || `${field} must be no more than ${max} characters`,
        code: 'MAX_LENGTH'
      });
    }
    return this;
  }

  email(field: string, value: string, customMessage?: string): this {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      this.errors.push({
        field,
        message: customMessage || `${field} must be a valid email address`,
        code: 'INVALID_EMAIL'
      });
    }
    return this;
  }

  url(field: string, value: string, customMessage?: string): this {
    try {
      if (value && !new URL(value).href) {
        this.errors.push({
          field,
          message: customMessage || `${field} must be a valid URL`,
          code: 'INVALID_URL'
        });
      }
    } catch {
      this.errors.push({
        field,
        message: customMessage || `${field} must be a valid URL`,
        code: 'INVALID_URL'
      });
    }
    return this;
  }

  imageUrl(field: string, value: string, customMessage?: string): this {
    if (!value) return this; // Optional field
    
    // Check if it's a valid URL (absolute)
    try {
      new URL(value);
      return this; // Valid absolute URL
    } catch {
      // Check if it's a valid relative path (starts with /)
      if (value.startsWith('/') && value.length > 1) {
        return this; // Valid relative path
      }
      
      // Check if it's a data URL
      if (value.startsWith('data:')) {
        return this; // Valid data URL
      }
      
      this.errors.push({
        field,
        message: customMessage || `${field} must be a valid URL or relative path`,
        code: 'INVALID_IMAGE_URL'
      });
    }
    return this;
  }

  oneOf(field: string, value: string, options: string[], customMessage?: string): this {
    if (value && !options.includes(value)) {
      this.errors.push({
        field,
        message: customMessage || `${field} must be one of: ${options.join(', ')}`,
        code: 'INVALID_OPTION'
      });
    }
    return this;
  }

  custom(field: string, isValid: boolean, message: string, code: string = 'CUSTOM'): this {
    if (!isValid) {
      this.errors.push({ field, message, code });
    }
    return this;
  }

  getResult(): ValidationResult {
    return {
      isValid: this.errors.length === 0,
      errors: [...this.errors]
    };
  }

  static validateBlog(data: any): ValidationResult {
    return new Validator()
      .required('title', data.title)
      .minLength('title', data.title, 5)
      .maxLength('title', data.title, 200)
      .required('excerpt', data.excerpt)
      .minLength('excerpt', data.excerpt, 20)
      .maxLength('excerpt', data.excerpt, 500)
      .required('content', data.content)
      .minLength('content', data.content, 100)
      .required('author', data.author)
      .minLength('author', data.author, 2)
      .maxLength('author', data.author, 100)
      .required('category', data.category)
      .oneOf('category', data.category, ['Programming', 'Technology', 'Career', 'Tutorials', 'Industry Insights'])
      .maxLength('tags', data.tags, 200)
      .imageUrl('featuredImage', data.featuredImage)
      .getResult();
  }

  static validateEnrollment(data: any): ValidationResult {
    return new Validator()
      .required('name', data.name)
      .minLength('name', data.name, 2)
      .maxLength('name', data.name, 100)
      .required('email', data.email)
      .email('email', data.email)
      .required('phone', data.phone)
      .minLength('phone', data.phone, 10)
      .required('courseId', data.courseId)
      .required('courseName', data.courseName)
      .required('experience', data.experience)
      .getResult();
  }
}
