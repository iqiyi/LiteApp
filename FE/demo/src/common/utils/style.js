import system from './os'

export function getPxByRpx(...rpxs) {
  return rpxs.reduce((px, rpx) => {
    return px + Math.floor(rpx * getRatio())
  }, 0)
}

export function getRpxByPx(px) {
    return px / ratio;
}

const systemInfo = system;
let ratio;
function getRatio() {
  return ratio || (ratio = Number.parseFloat(systemInfo.windowWidth / 750).toFixed(3))
}
