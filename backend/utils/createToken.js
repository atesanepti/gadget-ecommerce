
import jwt from "jsonwebtoken"

const genToken = (res,userId)=>{

    const token = jwt.sign({ userId }, process.env.JWT_KEY,{
        expiresIn : "30d"
    });

    res.cookie("accessKey",token,{
        httpOnly : true,
        maxAge : 30 * 24 * 60 * 60 * 1000,
        secure : process.env.NODE_ENV !== "development",
        sameSite : "strict"
    })


    return token;
}


export default genToken;