import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.mongo_url!) // to claim that this string will always be available its used in ts

        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("mongodb connected successfully");
        })

        connection.on('error',(err)=>{
            console.log("mongodb connection error. Please make sure Mongodb is running. "+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something goes wrong!");
        console.log(error);
    }
}