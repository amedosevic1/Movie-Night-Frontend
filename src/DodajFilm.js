import { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const DodajFilm = () => {

    const [id, setId] = useState(null);
    const [naziv, setNaziv] = useState("");
    const [godina, setGodina] = useState();
    const [zanr, setZanr] = useState("Horor");
    const [actors, setActors] = useState([]);
    const [ocjena, setOcjena] = useState();
    const history = useHistory();
    
    useEffect(()=>{
        if (typeof history.location.state !== 'undefined')
        {
        let state = history.location.state.film;
        console.log(state)
        setNaziv(state.naziv);
        setGodina(state.godina);
        setZanr(state.zanr);
        setOcjena(state.ocjena);
        setActors(state.glumci);
        setId(state.id); }

    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        
        let glumci = actors;
        console.log(id, "he");

       if(actors.length>0 && typeof actors[0].ime=='undefined'){
       glumci = actors.map((glumac)=>{
            const nova = glumac.split(" ");
            return {
                ime: nova[0],
                prezime: nova[1]
            }
        })} 


        const film = {id, naziv, godina, zanr, glumci, ocjena};

       fetch('http://localhost:8080/filmovi/dodaj', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(film)
        }).then(() => {
          history.push('/');
        })
    }


    return ( 
        <div className="map-elements">
            <h1>Movie night</h1>
            <div className="links">
                <Link to="/">Početna</Link>
            </div>
        <form className="forma" onSubmit={handleSubmit} >
            <label>Naziv filma: </label>
            <input 
                type="text" 
                required 
                value={naziv} 
                onChange={(e)=> setNaziv(e.target.value)}
            />
            <label>Godina: </label>
            <input 
                type="number"
                required 
                value={godina} 
                onChange={(e)=> setGodina(e.target.value)}
            />
            <label>Žanr: </label>
            <select
            value={zanr}
            onChange={(e) => setZanr(e.target.value)}
            >
            <option value="Horor">Horor</option>
            <option value="Komedija">Komedija</option>
            <option value="Drama">Drama</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Triler">Triler</option>
            <option value="Crime">Crime</option>
            <option value="Misterija">Misterija</option>
            <option value="Avantura">Avantura</option>
            </select>
            <label>Unesite glumce: </label>
            <select name="glumci" id="glumci" multiple
            value={actors} onChange={(e)=> {
                let optionGlumci = Array.from(e.target.selectedOptions, option => option.value)
                setActors(optionGlumci);  
            }} 
            >
                <option value="Glenn Close">Glenn Close</option>
                <option value="Judi Dench">Judi Dench</option>
                <option value="Robert De Niro">Robert De Niro</option>
                <option value="Leonardo DiCaprio">Leonardo DiCaprio</option>
                <option value="Morgan Freeman">Morgan Freeman</option>
                <option value="Tom Hanks">Tom Hanks</option>
                <option value="Anthony Hopkins">Anthony Hopkins</option>
                <option value="Marlon Brando">Marlon Brando</option>
                <option value="Harrison Ford">Harrison Ford</option>

            </select>
            <label>Ocjena: </label>
            <input
                type="number"
                required 
                value={ocjena} 
                onChange={(e)=> setOcjena(e.target.value)}
            />
            <button>Pošalji</button>
           
        </form>

        </div>
     );
} 
 
export default DodajFilm;