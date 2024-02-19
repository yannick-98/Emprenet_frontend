import { useState } from 'react'
import Router from './router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen min-h-screen flex flex-col lg:gap-5 bg-blue-200'>
      <Router />
    </div>
  )
}

export default App
