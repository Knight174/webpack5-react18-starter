import { useEffect } from 'react'
import './style/App.scss'

export default function App() {
  console.log('App re-render')

  useEffect(() => {
    // 副作用 hook 并没有依赖任何的状态数据，所以只会执行一次；而下面的那些依赖了某些状态，因此只要状态发生变化，hook 就会执行。
    console.log('mounted App 挂载（只一次）')
  }, [])

  return (
    <div>
      {/* Content */}
      <main className="wrapper">
        <div>Hello world!</div>
      </main>
    </div>
  )
}
