
import React from 'react'
//import { Overlay } from 'react-bootstrap'
import styled from "styled-components";


const Modal = ({children,state,changeState,title}) => {
    
    
    
  return (
    <>
    { (state===true)?
        <Overlay>
            <ContenedorModal reactive>
            <Contenido>
                <Encabezado> <h3> {title}</h3></Encabezado>
                <BottonClose onClick={()=>changeState(!state)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                      </svg>
                </BottonClose>
                {children}
                
            </Contenido>
            </ContenedorModal>
        </Overlay>:null
    }
    </>
  )
}

export default Modal;
//(show===true)?    :null

const Overlay= styled.div`
	width: 100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,.5);

    display:flex;
    padding: 75px;
    align-items:top;
    justify-content:center;
    @media (max-width: 768px) {
        padding: 50px;
    }

    @media (max-width: 576px) {
        padding: 20px;
    }
`
;

const ContenedorModal= styled.div`
max-width: 500px;
max-height: 35rem;
position:relative;
border-radius:5px;
background:#fff;
box-shadow: rgba(100,100,111,0.2)0px 7px 29px 0px ;
overflow-y: auto;
overflow: auto;
padding: 50px;



`;

const Encabezado=styled.div`
display:flex;
align-items:center;
justify-content:space-between;
margin-bottom:20px;
border-bottom:2px solid #E8E8E8;

h3{
    font-weight:500;
    font-size:30px;
    color:#1766DC;
}


`;

const BottonClose=styled.div`
    position:absolute;
    top:20px;
    right:20px;

    width: 20px;
    height:20px;
    border-radius:5px;
    border:nome;
    background:none;
    cursor:pointer;
    transition:.3s ease all;
    color:#1766DC;

    &:hover{
        background:#f2f2f2;
    }
    svg{
        width: 100%;
        height:100%;
    }
`;


const Contenido=styled.div`
display:flex;
align-items:center;
flex-direction:column;

h1{
    font-weight:500;
    font-size:30px;
    margin-bottom:10px;
}

p{
    front-size:18px;
    margin-bottom:20px;
}

`;

