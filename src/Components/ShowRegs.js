
import React,{useEffect,useState,Component} from 'react';
import {useForm} from "react-hook-form"; 
import axios from 'axios';
import Swal from 'sweetalert';
import withReactContent from 'sweetalert2-react-content';
import { show_alert } from './funtions';
import "./ShowInfo.css";
import Modal from './Modal';
import styled from "styled-components";

const ShowRegs = () => {

    const urlAll="https://formify-services.azurewebsites.net/Record/GetAll";
    const urlParams="https://formify-services.azurewebsites.net/Record/GetParams";
    const urlformParams="https://formify-services.azurewebsites.net/Form/GetParams";
    const urlById="https://formify-services.azurewebsites.net/form/GetById?";
    const [show, setShow] = useState(false);
    const [newreg, setNwereg] = useState(false);

    //Hooks State for set the information 
    const [Register,setRegister]=useState([]);
    const [Parameters,setParameters]=useState([]);
    const [QuestionTypes,setQuestionTypes]=useState([]);

    const [loading,setLoading]=useState(true);
    const [pageSize, setPageSize] = useState(10);       // Size of page 
    const [page, setPage] = useState(1);                // Amount of pages 
    
    const [Id,setId]=useState("");
    const [Name,setName]=useState("");
    const [Descrption,setDescription]=useState("");
    const [Date,setDate]=useState("");
    const [Est,setEst]=useState("");
    const [Act,setAct]=useState("");
    const [Action,setAction]=useState(1);               //Set Actions

    

    //Hooks Effect for render all the inforation getting 
    
    useEffect(()=>{
        getRegister();  
        
    },[]);

    const getRegister = async ()=>{
        try{
            setLoading(true);
        const params=await axios.get(urlParams);
        const answer=await axios.post(urlAll,{pageSize:pageSize,page:page});
        const formParams=await axios.get(urlformParams);
        setRegister(answer.data.collection);
        setParameters(params.data.forms);
        setQuestionTypes(formParams.data.questionTypes);
        console.log(QuestionTypes);
        setLoading(false);
       
        } catch(error){ console.error("Error al obtener los datos: ", error)        }
    }

    const handleShow = (obj) => {
        setShow(!show);    
    };
    const handleNew = (obj) => {
        setNwereg(!newreg); 
    };

    const handleChangeSelected = (id) => {
        asignRegister(id)
        setId(id);
        console.log("este es el valor de ID"+ Id)
        console.log("este valor es del handle "+id)
        
    };
    const asignRegister = async (id)=> {
        try{
        
        console.log("valor de asing register id "+id)
        
        console.log("valor del asingregister ID "+Id)
        const urlByIdsend=urlById+"formId="+id;
        
        const questioner=await axios.post(urlByIdsend,{formId:Id});
        
        console.log(questioner)
        console.log(id)
        console.log(Parameters)
        console.log(QuestionTypes);
        


        
        
        }
        catch(error) { console.error("Error al obtener los datos de las preguntas : ", error)        }
    };

    
   const downloadFile=(file)=>{
    asignDownload(file)
   }
   const asignDownload = async (file)=>{
    try{
        const urlDownload=""
    }
    catch(e){}
   }


    const {register, handleSubmit,watch,setValue}=useForm();
    const onSubmit=(data)=>{
        console.log(data);

    }

    


  return (
    <>
    <div className='App'>
        
    <div className="row mt-3" >
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
                <table responsive className='table table-striped table-hover table table-boredered '>
                      <thead>
                        <tr><th>Serial</th> <th>Formulario</th><th>Usuario</th><th>Acciones</th>       </tr>
                      </thead>
                        {(loading===true)? <li>Loading...</li>:
                        <tbody className='table-group-divider' >
                        {Register.map( (item)=>(
                            <tr key={item.formId} >
                            <td>{item.serial}</td> 

                            {Parameters.map((para)=>( (item.formId===para.customId)?<td>{para.name}</td>:null))}
                            
                            <td>{item.user}</td> 
                            {console.log (item.documentUrl)}
                            
                            
                            

                            <td>
                                    <button className='btn btn-info ' onClick={()=>handleShow(item)}>
                                        <i class='fa-regular fa-eye'></i>
                                    </button>
                                    <button className='btn btn-info'  onClick={(e) => console.log( item.documentUrl)}>
                                        <i class='fa fa-download'></i>
                                    </button>
                                </td>
                            
                            </tr> 
                        ))
                        }
                        </tbody>}
                </table>
            </div>
        </div> 
    </div>


     <div className='container-fluid '> 
        <div className='row mt-4'>
            <div className='col-md-4 offser-md-4'>
                <div className='d-grid mx-auto'>
                    <button className='btn btn-secondary' onClick={handleNew}>
                        <i className='fa-solid fa-circle-plus'></i>Nuevo Registro
                    </button>
                </div>
            </div>
        </div>
    </div>                   



    
</div>


<Modal state={show} changeState={setShow} >
            
            <div className='d-grid mx-auto'>
                      
                
            </div>
            


  </Modal>


  <Modal state={newreg} changeState={setNwereg} >
            
            <div className='d-grid mx-auto'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label> Select Register:  </label>
                            <select {...register("customId")} onChange={(e) => handleChangeSelected(e.target.value)}>
                                  {Parameters.map((para)=>( (para.customId)&&<option key={para.customId} value={para.customId}><td >{para.name}</td></option>))}
                                  {console.log (Parameters)}
                                  
                                  
                                  
                            </select>
                            

                        </form>
                    <imput type="submit">
                    <button className='btn btn-info' onClick={handleNew}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy2" viewBox="0 0 16 16">
                          <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v3.5A1.5 1.5 0 0 1 11.5 6h-7A1.5 1.5 0 0 1 3 4.5V1H1.5a.5.5 0 0 0-.5.5m9.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                          
                      </svg>  Salvar Registro
                    </button>
                    </imput>
                      
                
            </div>
  </Modal>

</>
  )
}

export default ShowRegs




