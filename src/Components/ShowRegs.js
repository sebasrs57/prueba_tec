
import React,{useEffect,useState,Component} from 'react';
import {useForm} from "react-hook-form"; 
import axios from 'axios';
import "./ShowInfo.css";
import Modal from './Modal';
import styled from "styled-components";

const ShowRegs = () => {

    const urlAll="https://formify-services.azurewebsites.net/Record/GetAll";
    const urlParams="https://formify-services.azurewebsites.net/Record/GetParams";
    const urlformParams="https://formify-services.azurewebsites.net/Form/GetParams";
    const urlById="https://formify-services.azurewebsites.net/form/GetById?";
    const urlRecorById="https://formify-services.azurewebsites.net/Record/GetById?recordId=";
    const urlRecorDownload="https://formify-services.azurewebsites.net/Record/Download?recordId=";

    const [show, setShow] = useState(false);
    const [newreg, setNwereg] = useState(false);

    //Hooks State for set the information 
    const [Register,setRegister]=useState([]);
    const [Parameters,setParameters]=useState([]);
    const [QuestionTypes,setQuestionTypes]=useState([]);
    const [Questions,setQuestions]=useState([]);
    const [DetailsRegister,setDetailsRegister]=useState([]);
    const [Answers,setAnswers]=useState([]);

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
        //console.log(Register);
        setLoading(false);
       
        } catch(error){ console.error("Error al obtener los datos: ", error)        }
    }

    const handleShow = (obj) => {
        setShow(!show);
        console.log(obj);
        console.log(obj.recordId);

        const urlRecordByIdsend =urlRecorById+obj.recordId;
        axios.post(urlRecordByIdsend,{recorId:obj.recordId})
        .then(response =>{
            const details = response
            //console.log(details);
            setDetailsRegister(details.data)
            setAnswers(details.data.answers)
            //console.log(obj.recordId);
            //console.log(Parameters)
            //console.log(QuestionTypes);
            //console.log(Questions);
        })

        
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
        

        axios.post(urlByIdsend,{formId:Id})
        .then(response =>{
            const questioner = response
            console.log(questioner.data.questions);
            setQuestions(questioner.data.questions);
            console.log(questioner.data.questions);
            console.log(id);
            //console.log(Parameters)
            //console.log(QuestionTypes);
            //console.log(Questions);
        })  
        }
        catch(error) { console.error("Error al obtener los datos de las preguntas : ", error)        }
    };

    
   const downloadFile=(recordedId)=>{
    asignDownload(recordedId)
   }
   const asignDownload = async (recordedId)=>{
    try{
        const urlRecordDownloandSend =urlRecorDownload+recordedId;
        axios.post(urlRecordDownloandSend,{recorId:recordedId})
        .then(response =>{
            const downloanslink = "https://formify-services.azurewebsites.net/"+response
            //console.log(details);
            axios.post(urlRecordDownloandSend,{downloanslink})
            //console.log(obj.recordId);
            //console.log(Parameters)
            //console.log(QuestionTypes);
            //console.log(Questions);
        })
    }
    catch(e){}
   }


    const {register, handleSubmit,watch,setValue}=useForm();

    const onSubmit=(data)=>{
        console.log(data);

    }


    const renderAnswers=(ans)=>{
        return (<>
                      <tr>Pregunta <td></td> <td><p> {ans.question.label}</p></td></tr>   
                      <tr>Respuesta <td></td> <td>
                        {ans.textValue && <p>{ans.textValue}</p>}
                        {ans.number && <p>{ans.number}</p>}
                        {ans.switchValue !== undefined && <p>{ans.switchValue ? "Sí" : "No"}</p>}
                       </td></tr>  
                      

                      </>)}

    const renderQuestion=(item)=>{
        const qType = QuestionTypes.find(qType => qType.id === item.type);

    
        return(
            <>
                
                
                <div style={{ textAlign: 'center' }}>
                    <label style={{ display: 'block' }}>{item.label}:  </label>
                    <div style={{ display: 'inline-block' }}>
                    {
                        qType && (
                            qType.id === 1 ? <input type="text" name={item.label} {...register(item.label)}/> :
                                qType.id === 2 ? <input type="number" name={item.label} {...register(item.label)}/> :
                                    qType.id === 3 ? <input type="checkbox" name={item.label} {...register(item.label)}/> :
                                        qType.id === 4 ? <input type="number" name={item.label} {...register(item.label)}/> :
                                            null
                        )
                    }
                </div>
                </div>


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
                        <tr><th>Serial</th> <th>Formulario</th><th>Usuario</th><th>Acciones</th>       </tr>
                      </thead>
                        {(loading===true)? <li>Loading...</li>:
                        <tbody className='table-group-divider' >
                        {Register.map( (item)=>(
                            <tr key={item.formId} >
                            <td>{item.serial}</td> 

                            {Parameters.map((para)=>( (item.formId===para.customId)?<td>{para.name}</td>:null))}
                            
                            <td>{item.user}</td> 
                            {console.log(Register)}
                            
                            
                            
                            

                            <td>
                                    <button className='btn btn-info ' id={item} onClick={()=>handleShow(item)}>
                                        <i class='fa-regular fa-eye'></i>
                                    </button>
                                    <button className='btn btn-info'  onClick={() => downloadFile(item.recordId)}>
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




          <Modal state={show} changeState={setShow} title={DetailsRegister.serial} >

          <div className='d-grid mx-auto'>
                      <table> 
                      <tr>Id de la respuesta <td></td> <td><p> {DetailsRegister.recordId}</p></td></tr>   
                      <tr>Id del formulario <td></td> <td><p>{DetailsRegister.formId}</p></td></tr>  
                      <tr>Nombre del formulario <td></td> <td><p>{DetailsRegister.user}</p></td></tr>

                      
                      {Answers && Answers.map((ans) => renderAnswers(ans))}
                      
                      
                      
                      </table>
                  </div>

            
          </Modal>
            


 


  <Modal state={newreg} changeState={setNwereg} title="Crear un registro ">
            
            <div className='d-grid mx-auto'  style={{ textAlign: 'center' }}>
                                  
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <label   style={{ display: 'block' }}> Seleccione su formularo a llenar:  </label>
                            <select {...register("customId")} onChange={(e) => handleChangeSelected(e.target.value)} style={{ display: 'inline-block' }}>
                                  {Parameters.map((para)=>( (para.customId)&&<option key={para.customId} value={para.customId}><td >{para.name}</td></option>))}

                                  
                                  
                                  
                            </select>

                            {Questions.map((item)=>renderQuestion(item))}
                                  
                        </form>
                    <imput type="submit">
                    <button className='btn btn-info' style={{ marginLeft: '70px',marginTop: '70px' }} onClick={handleSubmit(onSubmit)}>
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




