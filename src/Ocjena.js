import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/fontawesome-free-solid'
import { useEffect, useState } from 'react';

const Ocjena = ({grade}) => {

    const [ocjena, setOcjena] = useState(grade);


    return ( 
        <div className="ocjena-container">
            {[1,2,3,4,5].map((br)=>
            <FontAwesomeIcon icon={faStar} style={ {color: br<=ocjena ? 'yellow' : 'gray'}} /> )}
        </div>
     );
}
 
export default Ocjena;