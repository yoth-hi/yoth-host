export function clearTimeout(id){
  window.clearTimeout(id)
}
export function clearInterval(id){
  window.clearInterval(id)
}
export function setInterval(callback, time){
  return window.setInterval(callback, time)
}
export function setTimeout(callback, time){
  return window.setTimeout(callback, time)
}
