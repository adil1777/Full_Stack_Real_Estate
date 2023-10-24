import axios from 'axios';
import dayjs from "dayjs";
import { toast } from 'react-toastify';

// Create an Axios instance with the base URL
export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    // Make the GET request with the relative URL
    const response = await api.get("/residency/allresd", {
      timeout: 10 *1000,
    });
    if (response.status === 200) {
         console.log("Response data:", response.data);
      return response.data;
    } else if (response.status === 400) {
      throw new Error("Bad request: " + response.data);
    } else if (response.status === 500) {
      throw new Error("Server error: " + response.data);
    } else {
      throw new Error("Unexpected error occurred.");
    }
  } catch (error) {
    toast.error("Something went wrong: " + error.message);
    throw error;
  }
};

//getProperty
 export const getProperty=async(id)=>{
  try {
    // Make the GET request with the relative URL
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 *1000,
    });
    if (response.status === 200) {
         console.log("Response data:", response.data);
      return response.data;
    } else if (response.status === 400) {
      throw new Error("Bad request: " + response.data);
    } else if (response.status === 500) {
      throw new Error("Server error: " + response.data);
    } else {
      throw new Error("Unexpected error occurred.");
    }
  } catch (error) {
    toast.error("Something went wrong: " + error.message);
    throw error;
  }
 }


 // Define an asynchronous function called 'createUser' that takes 'email' and 'token' as parameters.
 export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};


// Define an asynchronous function called 'bookVisit' that takes 'date','propertyId', 'email' and 'token' as parameters.
export const bookVisit = async (date, propertyId, email, token) => {
  try {
    await api.post(
      `/user/bookVisit/${propertyId}`,
      {
        email,
        id: propertyId,
        date: dayjs(date).format("DD/MM/YYYY"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

// Remove Booking 

export const removeBooking = async (id, email, token) => {
  try {
    await api.post(
      `/user/removeBooking/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};

// To favourites Residency
 export const toFav = async (id, email, token)=>{
  try {
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");

    throw error;
  }
};

// To get All Favourites
export const getAllFav = async (email, token)=>{
   if(!token) return
  try {
      const res= await api.post(
      `/user/allFav`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
   // console.log(res)
    return res.data["favResidenciesID"];
  } catch (error) {
    toast.error("Something went wrong while fetching favourites");

    throw error;
  }
};

 //To getAllBookings
 export const getAllBookings = async (email, token)=>{
  if(!token) return
 try {
     const res= await api.post(
     `/user/allBookings`,
     {
       email,
     },
     {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     }
   );
  // console.log("res", res)
   return res.data["bookedVisits"];
 } catch (error) {
   toast.error("Something went wrong while fetching bookings");

   throw error;
 }
};

//Create Residency
export const createResidency = async (data, token) => {
  console.log(data)
  try{
    const res = await api.post(
      `/residency/create`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }catch(error)
  {
    throw error
  }
}
