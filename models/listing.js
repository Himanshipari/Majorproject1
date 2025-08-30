const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description:String,
    image:{
        filename:{type:String, default:"listingImage"},
        url:{
            type:String,
        default://default check krta h img null h yaa h hi nhi img exist nhi krti//testing ke liye ye option
            "https://images.unsplash.com/photo-1755862141499-5f39093e59b8?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v)=> 
            v===""//img toh h lekin link empty h client user ke liye h ye option
        ? "https://images.unsplash.com/photo-1755862141499-5f39093e59b8?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
},
    },
    price:Number,
    location:String,
    country:String,
});


const Listing=mongoose.model("Listing", listingSchema);
module.exports= Listing;