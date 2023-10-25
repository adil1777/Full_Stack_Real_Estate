import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,    
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    
    res.send({message: "Residency created successfully",residency});
}catch (err) {
    console.error("Error creating residency:", err);
    if (err.code === "P2002") {
        throw new Error("A residency with the same address already exists");
    }
    throw new Error(err.message);
}

});

 // function to get All Residencies/ documentation;
export const getAllResidencies = async (req, res) => {
    try {
      const residencies = await prisma.residency.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      res.send(residencies);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error.message);
      res.status(500).send("An error occurred while fetching residencies");
    }
  };

  // function to get a specific Residency/document;

export const getResidency= asyncHandler (async (req, res)=>{
    const {id} = req.params;

    try{
        const residency = await prisma.residency.findUnique({
            where: {id : id}
        })
        res.send(residency)
    }catch(err){
        throw new Error(err.message);
    }
          
});
  