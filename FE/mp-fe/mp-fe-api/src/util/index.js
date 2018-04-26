export * from './env';
export * from './network';

export function isUndef (v) {
  return v === undefined || v === null
}

export function isDef (v){
  return v !== undefined && v !== null
}

/**
 * Mix properties into target object.
 */
export function extend (to, _from){
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
