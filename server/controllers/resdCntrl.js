import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { messages } from "../utils/messages.js";
import { statusCodes } from "../utils/statusCodes.js";


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
        owner: { connect: { email: "mohdadil0760@gmail.com" } },
      },
    });

    return res.status(statusCodes.CREATED).json({
      message : messages.RESIDENCY_CREATED,
      residency,
    });
    
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

       return res.status(statusCodes.OK).json({
      success: true,
      data: residencies
    });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error.message);
      res.status(statusCodes.INTERNAL_SERVER_ERROR).send(messages.SOMETHING_WENT_WRONG);
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
  