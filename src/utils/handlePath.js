export function getRedirectPath(type, head) {
  let path

  if (!head) {
    // 信息未完善
    path = type === 'yingpin' ? '/yingpin' : '/zhaopin'
  } else {
    // 信息已完善
    path = type === 'yingpin' ? '/yingpinpage' : '/zhaopinpage'
  }

  return path
}