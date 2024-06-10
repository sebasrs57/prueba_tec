import React,{useEffect,useState,Component} from 'react';
import ShowInfo from "./ShowInfo"; 
import ShowRegs from "./ShowRegs"; 
import "./NavBar.css"

function NavBar (){

    const [tablaActual, setTablaActual] = useState('home');

    const mostrarTabla = (tabla) => {
        setTablaActual(tabla);
      };

    return(
        <body>


            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container  container-fluid   ">
                    <a className="navbar-brand" style={{ fontSize: '1.2rem',maxwidth:'100%', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }} href="#">Pagina de formularios </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ml-auto">
                        <button href="#" className="btn btn-outline-info me-2" type="button" onClick={() => mostrarTabla('home')}>Home</button>
                        <button href="#" className="btn  btn-outline-info" type="button" onClick={() => mostrarTabla('table1')}>Forms</button>
                        <button href="#" className="btn  btn-outline-info" type="button" onClick={() => mostrarTabla('table2')}>Registers</button>

                            
                        </ul>
                    </div>
                </div>
            </nav>

        

            
          

            <div>
                {/* Mostrar la tabla correspondiente al estado actual */}
                {tablaActual === 'home' && <TablaHome />}
                {tablaActual === 'table1' && <Tabla1 />}
                {tablaActual === 'table2' && <Tabla2 />}
            </div>

            
            

        </body>


        
    );
}


// Component Home
function TablaHome() {
    return (
        <div>
            <h2 >Home</h2>
            
        </div>
    );
}

// Component Table Forms
function Tabla1() {
    return (
        <div>
            <h2>Formularios</h2>
            <ShowInfo>  
            </ShowInfo>
        </div>
    );
}

// Component Table registers
function Tabla2() {
    return (
        <div>
            <h2>Registros</h2>
            <ShowRegs></ShowRegs>
        </div>
    );
}



export default NavBar;


