
import './Properties.css'
import SearchBar from '../../components/SearchBar/SearchBar';
import {PuffLoader} from  'react-spinners';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { useState } from 'react';
import usePropertiess from '../../hooks/usePropertiess';
const Properties = () => {
  const{data, isError, isLoading}= usePropertiess();
  const[filter , setFilter] = useState("");
  
  if(isError){
    return(
      <div className="wrapper">
        <span>Error while fetching Data</span>
      </div>

    )
  }
if(isLoading){
  return (
     <div className="wrapper flexCenter" style={{height: "60vh"}}>
          <PuffLoader 
            height="80"
            width="80"
            radius={1}
            color= "#4066ff"
            aria-label="puff-loading"
          />
     </div>
  )
}
console.log(data);


if (!Array.isArray(data)) {
  // Handle the case where data is not an array (e.g., show an error message).
  return (
    <div className="wrapper">
      <span>Error: Data is not fetch from back-end.</span>
    </div>
  );
}

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
          <SearchBar 
             filter={filter}
             setFilter={setFilter}
          />
        <div className="paddings flexCenter properties">
        {
            // data.map((card,i)=> (<PropertyCard card={card} key={i} />))

           data
            .filter((property)=>
                property.title.toLowerCase().includes(filter.toLowerCase())||
                property.city.toLowerCase().includes(filter.toLowerCase())||
                property.country.toLowerCase().includes(filter.toLowerCase())
           )
           .map((card,i)=> (
             <PropertyCard card={card} key={i} />
           ))
        }
        </div>
      </div>
    </div>
  )
}

export default Properties