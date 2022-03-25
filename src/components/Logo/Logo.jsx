// 把图片当成一个模块
import logo from './logo.jpg'

export function Logo() {
  return (
    <div>
      <img src={logo} alt="" width="100" style={{ display: 'block', margin: '125px auto 0' }} />
    </div>
  )
}