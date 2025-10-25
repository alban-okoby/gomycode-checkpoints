import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card, Container } from "react-bootstrap";
// Import our components
import Name from './components/Name';
import Description from './components/Description';
import Image from './components/Image';
import Price from './components/Price';

const firstName = "Alban"; 
function App() {
  return (
    <>
      <Container className="d-flex flex-column align-items-center mt-5">
      <Card style={{ width: "22rem", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
        <Card.Body className="text-center">
          <Image />
          <Name />
          <Price />
          <Description />
        </Card.Body>
      </Card>

      <div className="mt-3 text-center">
        {firstName ? (
          <>
            <h3>Hello, {firstName}!</h3>
            <img
              src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
              alt="hello"
              style={{ width: "150px", marginTop: "10px" }}
            />
          </>
        ) : (
          <h3>Hello, there!</h3>
        )}
      </div>
    </Container>
    </>
  )
}

export default App
