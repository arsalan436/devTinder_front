import { Route, Routes } from "react-router-dom"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Feed from "./Components/Feed"

function App() {

  return (
    <>
      
      <Routes>
        <Route path="/" element={<Body/>}>
          
          <Route path="/" element={<Feed/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Route>
      </Routes>

      
    </>
  )
}

export default App
