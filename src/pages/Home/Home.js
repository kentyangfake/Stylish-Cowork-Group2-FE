import React , { useEffect,useState } from 'react';
import Carousel from './Carousel';
import Products from './Products';
import styled from 'styled-components';

const Cat = styled.div`
  width:100px;
  height:100px;
  border-radius:50px;
  background-color:olive;
  position:absolute;
  top: ${(props)=> props.position.top};
  left: ${(props)=> props.position.left};
`

function Home() {
  const [position, setPosition] = useState({ top: "700px", left: "300px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        top: Math.floor(Math.random() * window.innerHeight) + 700 + "px",
        left: Math.floor(Math.random() * window.innerWidth) + "px",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Carousel />
      <Products />
      <Cat position={position}/>
    </>
  );
}

export default Home;
