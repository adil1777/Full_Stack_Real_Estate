import asyncHandler from "express-async-handler";

import {prisma} from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req,res)=>{
    console.log("creating a user");

    let {email} =req.body;
   const userExists= await prisma.user.findUnique({where: {email:email}});
   console.log(userExists);
   if(!userExists) {
    const user = await prisma.user.create({ data: req.body});
    res.send({
        meassage: "User registered successfully",
        user:user,
    });
    // console.log(user);
   }
   else res.status(201).send({message: "User already registered"});
});

// fuction to book a visit to residency

export const bookVisit = asyncHandler(async (req , res)=>{
       const {email,date}= req.body;
       const {id} =req.params;

       try{
         const alreadyBooked = await prisma.user.findUnique({
                where : {email:email},
                select : {bookedVisits : true}
         });

         if(alreadyBooked.bookedVisits.some((visit)=>visit.id=== id)){
            res.status(400).json({message: "This residency is already booked by you"})
         }
         else{
                await prisma.user.update({
                   where:{email:email},
                   data:{
                      bookedVisits : {push : {id , date}}
                   } 
                });
         }
         res.send("your visit is booked successfully");
       } catch(err) {
        throw new Error (err.message);
       }
});

// function to get all booking of a user
export const getAllBookings = asyncHandler(async (req,res)=>{
    const {email} = req.body;
    try{
          const bookings = await prisma.user.findUnique({
            where : {email},
            select : {bookedVisits : true}
          });
          res.status(200).send(bookings)
    }
    catch(err){
        throw new Error (err.message);
    }
});

// function  to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        // Step 1: Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisits: true }
        });

        // Step 2: Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Step 3: Find the index of the booking in the user's bookedVisits array
        const index = user.bookedVisits.findIndex((visit) => visit.id === id);

        // Step 4: Check if the booking exists
        if (index === -1) {
            return res.status(404).json({ message: "Booking not found" });
        } else {
            // Step 5: Remove the booking from the array
            user.bookedVisits.splice(index, 1);

            // Step 6: Update the user's bookedVisits in the database
            await prisma.user.update({
                where: { email: email },
                data: {
                    bookedVisits: user.bookedVisits
                }
            });

            // Step 7: Send a success response
            return res.send("Booking cancelled successfully");
        }
    } catch (err) {
        console.error(err);

        // Handle errors gracefully
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Function to add a residency to the user's favorite list
export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { rid } = req.params;
  
    try {
      // Find the user based on their email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        // Handle the case where the user does not exist
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.favResidenciesID.includes(rid)) {
        // If the residency ID is already in favorites, remove it
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              set: user.favResidenciesID.filter((id) => id !== rid),
            },
          },
        });
        return res.send({ message: 'Removed from favorites', user: updateUser });
      } else {
        // If the residency ID is not in favorites, add it
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favResidenciesID: {
              push: rid,
            },
          },
        });
        return res.send({ message: 'Added to favorites', user: updateUser });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Function to get all favorite residencies for a user
  export const getAllFavourites = asyncHandler(async (req, res) => {
    const { email } = req.body;
  
    try {
      // Find the user based on their email and select their favorite residency IDs
      const user = await prisma.user.findUnique({
        where: { email },
        select: { favResidenciesID: true },
      });
  
      if (!user) {
        // Handle the case where the user does not exist
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Retrieve the list of favorite residency IDs from the user data
      const favoriteResidencyIDs = user.favResidenciesID;
  
      // Now, you can use these residency IDs to fetch the actual residency data from your database if needed
      // For example:
      const favoriteResidencies = await prisma.residency.findMany({
        where: {
          id: {
            in: favoriteResidencyIDs,
          },
        },
      });
  
      // Send the list of favorite residencies to the client
      res.status(200).json({ favoriteResidencies });
    } catch (err) {
      // Handle any errors that occur during the process
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  