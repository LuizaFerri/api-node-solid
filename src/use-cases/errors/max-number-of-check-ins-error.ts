export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Número máximo de check-ins no dia já atingido.')
  }
} 