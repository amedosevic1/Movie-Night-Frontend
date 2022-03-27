import { useState } from "react";

const Filter = ({filterTable}) => {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        
        setSearch(e.target.value);
        
        filterTable(e.target.value);
    }
    
    return ( 
        <div className="search">
             <div className="filter">
            <input className="search-box" type="search" name="search" id="search"
            onChange={handleChange} value={search}
            />
            </div>
        </div>
     );
}
 
export default Filter;