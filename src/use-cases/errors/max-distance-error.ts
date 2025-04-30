export class MaxDistanceError extends Error {
  constructor() {
    super('A distância máxima para check-in foi excedida.')
  }
} 