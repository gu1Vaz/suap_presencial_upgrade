import React,{ useRef, useEffect } from 'react';
import {Container, Icone} from './styles';
import StickmanRunning from '../StickmanRunning';

const Loading = (props) => {
  
  const ref = useRef()
  useEffect(() => {
    if(props.isPage){
      ref.current.style.minHeight = "80vh";
    }
    if(props.noMax){
      ref.current.style.width = "25px";
    }
  })
  return (
       <Container ref={ref}>
            {props.isPage && 
              <Icone to="/" >
                  <StickmanRunning/>
              </Icone>
            }
           <div style={{height:"25px",width:"25px",fontSize:"7px"}}
                className="spinner-border text-light" role="status"/>
       </Container>
  )
}

export default Loading