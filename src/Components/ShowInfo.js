import React,{useEffect,useState,} from 'react';
import axios from 'axios';

import { show_alert,formatearFecha } from './funtions';
import "./ShowInfo.css";
import Modal from './Modal';



const ShowInfo = () => {
    const urlAll="https://formify-services.azurewebsites.net/Form/GetAll";
    const urlParams="https://formify-services.azurewebsites.net/Form/GetParams";
  

    const urlById="https://formify-services.azurewebsites.net/form/GetById?formId=";

    //Hooks State for set the information 
    const [Information,setInformation]=useState([]);
    const [Parameters,setParameters]=useState([]);
    const [QuestionTypes,setQuestionTypes]=useState([]);
    const [Questions,setQuestions]=useState([]);

    const[Detaills,setDetaills]=useState([]);

    const [loading,setLoading]=useState(true);
    const [pageSize, setPageSize] = useState(10); // Size of page 
    const [page, setPage] = useState(1); // Amount of pages 
    const [Action,setAction]=useState(1); //Set Actions

    //hooks for modal 
    const [show, setShow] = useState(false);
    const[name,setName]=useState();
    const[descrption,setDescription]=useState();
    const[date,setDate]=useState();
    const[state,setState]=useState();
    const[act,setAct]=useState();
    const[ver,setVer]=useState();
    const[id,setId]=useState();
    
    
    //Hooks Effect for render all the inforation getting 
    
    useEffect(()=>{
        getInfo();  
    },[]);

    
    //Get the information and Setting by the hook 
    
        const getInfo = async ()=>{
            try{
                setLoading(true);
            const params=await axios.get(urlParams);
            const answer=await axios.post(urlAll,{pageSize:pageSize,page:page});
            setInformation(answer.data.collection);
            setParameters(params.data.formStates);
            console.log(params);
            console.log(Parameters);
            setQuestionTypes(params.data.questionTypes);
            console.log(QuestionTypes);
            console.log(params.data.questionTypes);
    
            Information.forEach((item)=>{
                Parameters.forEach((itemp)=>{
                    if(item.state === itemp.id){
                        const newItem = { ...item, strgState: itemp.name }; // Create a new object with strgState property
                        const index = Information.indexOf(item); // Encontrar el índice del elemento actual en Information
                        Information[index] = newItem; // Add the new property to the old object
                    }
                    
                });
            });
            
            console.log(Information);
            
           
            setLoading(false);
           
            } catch(error){ console.error("Error al obtener los datos: ", error)        }
        }
    
        const handleShow = (obj) => {
            setShow(!show);
            setName(obj.name)
            setDescription(obj.description)
            setId(obj.formId)
            setAct(obj.isActive)
            setDate(obj.createdDate)
            setVer(obj.version)
            
            getDetails(obj.formId);
            

            {Parameters.map((para)=>( (obj.state===para.id)? setState(para.name):null))}
            
            
            
        };
        
        const getDetails = async (identification)=>{
            try{
        
               
                const urlByIdsend=urlById+identification;
                
                const detaills=await axios.post(urlByIdsend,{formId:identification});
                setQuestions(detaills.data.questions)
                console.log(detaills)
                
                console.log(Parameters)
                console.log(QuestionTypes)
                }
                catch(error) { console.error("Error al obtener los datos de las preguntas : ", error) }
            };
        


 const renderQuestion=(item)=>{

    
    return(
        <>
            <tr>QuestionId: <td></td> <td><p>{item.questionId}</p></td></tr>
            <tr>Question: <td></td> <td><p>{item.label}</p></td></tr>
            {QuestionTypes.map((qType)=>((item.type===qType.id)? <tr>Answer Type: <td></td> <td><p>{qType.name}</p></td></tr>:null))}
        </>

    )

    }





  return (
    <>
    <div className='App'>
        
        <div className="row mt-3" >
            <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                <div className='table-responsive'>
                    <table responsive className='table table-striped table-hover table table-boredered '>
                          <thead>
                            <tr><th>Nombre</th> <th>Descripcion</th><th>fecha</th><th>Estado</th><th>Activo</th><th>Acciones</th>       </tr>
                          </thead>
                            {(loading===true)? <tbody><tr>Loading...</tr></tbody>: //conditional render if the information would ready
                            <tbody className='table-group-divider' >
                            {Information.map( (item)=>(
                                <tr key={item.formId} >
                                <td>{item.name}</td>  
                                <td>{item.description}</td> 
                                <td>{formatearFecha(item.createdDate)}</td> 
                                
                                {Parameters.map((para)=>( (item.state===para.id)?<td>{para.name}</td> :null))}
                                {(item.isActive === true)?<td>si</td>:<td>no</td>} 
                                
                                <td>
                                    <button id={item.formid} className='btn btn-info ' onClick={()=>handleShow(item)}>
                                        <i class='fa-regular fa-eye'></i>
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

        



        <Modal state={show} changeState={setShow} title={name} >
            
                  <div className='d-grid mx-auto'>
                      <table> 
                      <tr>Name: <td></td> <td><p>{name}</p></td></tr>   
                      <tr> Descrition:<td></td> <td><p>{descrption}</p></td></tr>  
                      <tr> Id:<td></td> <td><p>{id}</p></td></tr>
                      <tr> Version:<td></td> <td><p>{ver}</p></td></tr>
                      <tr>State: <td></td> <td><p>{state}</p></td></tr>
                      <tr> Date:<td></td> <td><p>{formatearFecha(date)}</p></td></tr>
                      <tr> Active:<td></td> <td><p>{(act === true)?<td>si</td>:<td>no</td>}</p></td></tr>
                      {Questions.map((item)=>renderQuestion(item))}
                      
                      
                      
                      </table>
                  </div>
                  


        </Modal>


        </div>
    
    
    


</>



  )
}

export default ShowInfo

