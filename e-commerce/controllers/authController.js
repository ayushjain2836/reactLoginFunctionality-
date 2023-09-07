import { hashPassword ,comparePassword} from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res)=>{
    try{
        const{name,email,password,phone,address}= req.body
        if(!name){
            return res.send({message: 'name is required'})
        }
        if(!email){
            return res.send({message: 'email is required'})
        }
        if(!password){
            return res.send({message: 'password is required'})
        }
        if(!phone){
            return res.send({message: 'phone is required'})
        }
        if(!address){
            return res.send({message: 'address is required'})
        }

        //existing user
        const existingUser= await userModels.findOne({email})
        if(existingUser){
            return res.status(200).send({success:true,message:'already resgired plz login'})
        }

        //register user
        const hashedPassword= await hashPassword(password)

        const user= await new userModels({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({success:true,message:'user register sucessfully',user})
    }catch(error){
        console.log(error);
        res.status(500).send({success:false,message:'error in registration',error})
    }
}

export const logincontroller = async (req,res)=>{
    try{
        
        const {email,password}=req.body;

        if(!email || !password){
        return res.status(404).send({
            sucess:false,message:'invalid email or password'
        })}
        //check user
        
        const user =await userModels.findOne({email});

        if(!user)
        {
            return res.status(404).send({sucess:false,message:'email not found'})
        }
        
        const match =await comparePassword(password,user.password)

        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid password'
             })
        }
        //token 
        const token =  JWT.sign({user:{id: user._id }}, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role,
            },
            token,
          });

    }catch(error){
        console.log(error);
        res.status(507).send({
            sucess:false,
            message:'error in login',
            error
        })
    }
}

export const testController=(req,res)=>{
    console.log('protected route');
}