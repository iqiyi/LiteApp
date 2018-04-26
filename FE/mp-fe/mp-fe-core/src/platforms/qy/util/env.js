export const inWeb = typeof window !== 'undefined'
export const inApp = typeof window === 'undefined' && typeof global !== 'undefined' && typeof global.__base__ !== 'undefined';
export const ctx = inApp ? global : window

