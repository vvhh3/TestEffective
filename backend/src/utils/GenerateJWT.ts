import jwt from "jsonwebtoken"

export const GenerateJWT = async (id: number) => {
    try{
        return jwt.sign(
            {id},
            process.env.JWTSecret!,
            {
                expiresIn: "2h"
            }
        )
    }catch(e){
        console.log(e)
    }
}