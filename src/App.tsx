// import { useState } from 'react'
import './App.css'
import { StateMachineProvider } from 'little-state-machine'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './state/store';
import Header from './components/Header'
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Step4 from './pages/Step4'
import Step5 from './pages/Step5'
import Step6 from './pages/Step6'
import Step7 from './pages/Step7';

function App() {
  return (
    <>
      <StateMachineProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Step1 />} />
            <Route path="/step2" element={<Step2 />} />
            <Route path="/step3" element={<Step3 />} />
            <Route path="/step4" element={<Step4 />} />
            <Route path="/step5" element={<Step5 />} />
            <Route path="/step6" element={<Step6 />} />
            <Route path="/step7" element={<Step7 />} />
            {/* <Route path="/result" component={Result} /> */}
          </Routes>
        </BrowserRouter>
      </StateMachineProvider>
    </>
  )
}

export default App
