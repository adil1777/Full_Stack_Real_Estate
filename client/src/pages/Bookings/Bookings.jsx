import SearchBar from '../../components/SearchBar/SearchBar';

import {PuffLoader} from  'react-spinners';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { useContext, useState } from 'react';
import '../Properties/Properties.css'
import UserDetailContext from '../../Context/UserDetailContext';
import usePropertiess from '../../hooks/usePropertiess';

const Bookings = () => {
  const{data, isError, isLoading}= usePropertiess();
  const[filter , setFilter] = useState("");
  const {userDetails} = useContext(UserDetailContext);
  const bookings = userDetails?.bookings || [];

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
              .filter((property) =>
                bookings.map((booking) => booking.id).includes(property.id)
              )

              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <PropertyCard card={card} key={i} />
    ))
        }
        </div>
      </div>
    </div>
  )
}

export default Bookings