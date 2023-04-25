import jwt from "jsonwebtoken";
export const verify = (request,response,next)=>{
  let token = request.headers.authorization;
  console.log(token);
  try{
    if(!token)
     throw new Error();
    jwt.verify(token,"fdfxvcvnreorevvvcrerer");
    next();
  }
  catch(err){
    return response.status(401).json({error: "Unauthorized request", status: false});
  }
}