import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <h1>Home12</h1>
}

function Battle() {
  return <h1>Battle1</h1>
}

function App() {
  return (
      <>
        <nav>
          <Link to="/">Home</Link> | <Link to="/battle">Battle</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
      </>
  )
}

export default App