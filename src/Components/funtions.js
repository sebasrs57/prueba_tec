//Funtion that will be use in all proyect
import axios from 'axios';

import React,{useEffect,useState,Component} from 'react';
import Swal from 'sweetalert';
import withReactContent from 'sweetalert2-react-content';

export function show_alert(mensage,icono,foco){
    onfocus(foco);

    const MySwal= withReactContent(Swal);
    MySwal({
        title:mensage,
        icon:icono
    });
}

function onfocus(foco){
    if(foco!== ""){
        document.getElementById(foco).focus();
    }
}

export function formatearFecha (fechaOriginal)  {
    const fecha = new Date(fechaOriginal);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  }
