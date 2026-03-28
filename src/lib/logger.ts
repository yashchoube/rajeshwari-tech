// Enterprise-grade logging system

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  requestId?: string;
  userId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context, requestId, userId } = entry;
    let formatted = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (requestId) formatted += ` [Request: ${requestId}]`;
    if (userId) formatted += ` [User: ${userId}]`;
    if (context && Object.keys(context).length > 0) {
      formatted += ` [Context: ${JSON.stringify(context)}]`;
    }
    
    return formatted;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, requestId?: string, userId?: string): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      requestId,
      userId
    };

    const formattedMessage = this.formatMessage(entry);

    // Console output
    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.DEBUG:
        if (this.isDevelopment) {
          console.debug(formattedMessage);
        }
        break;
    }

    // In production, you would send logs to a service like:
    // - Winston with transports (file, database, external service)
    // - CloudWatch, DataDog, New Relic, etc.
    // - Custom logging service
  }

  error(message: string, context?: Record<string, any>, requestId?: string, userId?: string): void {
    this.log(LogLevel.ERROR, message, context, requestId, userId);
  }

  warn(message: string, context?: Record<string, any>, requestId?: string, userId?: string): void {
    this.log(LogLevel.WARN, message, context, requestId, userId);
  }

  info(message: string, context?: Record<string, any>, requestId?: string, userId?: string): void {
    this.log(LogLevel.INFO, message, context, requestId, userId);
  }

  debug(message: string, context?: Record<string, any>, requestId?: string, userId?: string): void {
    this.log(LogLevel.DEBUG, message, context, requestId, userId);
  }
}

export const logger = new Logger();
