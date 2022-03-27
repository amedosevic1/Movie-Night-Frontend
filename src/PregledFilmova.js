import React, { useState, useEffect } from "react";
import Ocjena from "./Ocjena";
import {Link, useHistory, useParams} from 'react-router-dom'
import Filter from "./Filter";


const PregledFilmova = () => {
    
    const [filmovi, setFilmovi] = useState([]);
    const [filtrirani, setFiltrirani] = useState([]);
    const history = useHistory();
  
    useEffect(()=>{
        fetch('http://localhost:8080/filmovi', {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin':'*'
        }})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setFilmovi(data);
            setFiltrirani(data);
        });

    },[])

    const handleDelete = (e)=>{

        fetch('http://localhost:8080/filmovi/'+ e.target.id , {
            method: 'DELETE'})
        .then(() => {
            const newFilmovi = filtrirani.filter(film => film.id!=e.target.id);
            setFiltrirani(newFilmovi);
            const newFilmovi2 = filmovi.filter(film => film.id!=e.target.id);
            setFilmovi(newFilmovi2);
        }) 
    }

    const handleUpdate = (e)=>{
        const id = e.target.id;
        const film = filmovi.filter(film => film.id == id)[0];

        history.push('/dodaj', {film:film});
              
    }

    const filterTable = (search) =>{
        if(search.length>=3){
        const newFilteredFilmovi= filmovi.filter(film => film.naziv.toUpperCase().includes(search.toUpperCase()));
        setFiltrirani(newFilteredFilmovi); }else{
            setFiltrirani(filmovi);
        }
    }
    
    return (  
        <div className="map-elements">
        <h1>Movie Night</h1>
        <div className="links">
            <Link to="/dodaj" >Dodaj film</Link>
        </div>
        <div className="search">
            <h2>Pretraži filmove: </h2>
        </div>
       <Filter filterTable={filterTable}/>
        <table className="tabela">
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>Godina</th>
                    <th>Žanr</th>
                    <th>Glumci</th>
                    <th>Ocjena</th>
                    <th>Brisanje</th>
                    <th>Ažuriranje</th>
                </tr>
           </thead>
        {filtrirani.map((film)=>
        <tbody key={film.id}> 
           <tr>
               <td>{film.naziv}</td>
               <td>{film.godina}</td>
               <td>{film.zanr}</td>
               <td>
                   <ul>
                   {film.glumci.map((glumac, index)=>
                        <li key={glumac.id}>{glumac.ime} {glumac.prezime}{index!=film.glumci.length-1 && <span>,</span>}</li>

                   )}
                   </ul>
               </td>
               <td><Ocjena grade={film.ocjena}  /></td>
               <td>
                   <button id={film.id} onClick={handleDelete}>
                    Obrisi
                   </button>
               </td>
               <td>
                   <button id={film.id} onClick={handleUpdate}>
                    Ažuriraj
                   </button>
               </td>
           </tr>
        </tbody> 
        )}
        </table>
        </div>
    );
}
 
export default PregledFilmova;