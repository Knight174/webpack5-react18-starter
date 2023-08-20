import { useEffect } from 'react'
import './style/App.scss'
import img from 'src/assets/wechat.png'

export default function App() {
  console.log('App re-render')

  useEffect(() => {
    console.log('mounted App 挂载（只一次）')
  }, [])

  return (
    <div>
      {/* Content */}
      <main className="wrapper">
        <div>Hello world!</div>
        <img width={'300px'} src={img} alt="wechat" />
      </main>
    </div>
  )
}
