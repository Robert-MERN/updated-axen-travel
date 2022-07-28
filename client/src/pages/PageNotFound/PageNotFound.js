import React, { useEffect } from 'react'
import styled from "styled-components";

function PageNotFound() {
  useEffect(() => {
    document.getElementById("topSection").scrollIntoView({ behavior: "auto" });
    document.getElementById("website-title").innerHTML = "AXEN HOLIDAYS | 404"
  }, []);
  return (
    <SliderWrapper id="topSection" >
      <p>Page Not Found | 404 :(</p>
    </SliderWrapper>
  )
}

const SliderWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 30px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  img{
    width: 50%;
    height: 50%;
    object-fit: cover;
  }
  p{
    color: #5c5c5c;
    font-size: 25px;
    white-space: nowrap;
    margin-top: 20px;
  }
 
`


export default PageNotFound