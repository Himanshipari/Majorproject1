const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const { listingSchema,reviewSchema }=require("../schema.js");
const Listing=require("../models/listing.js");

const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
  if(error){
    let errMsg=error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,error);
  }else{
    next();
  }
};
//Index Route
router.get("/", wrapAsync(async (req,res)=>{
  const allListings= await Listing.find({});
       res.render("listings/index", { allListings });
    })
);
//new route ko show route ke uppar rkhge because show route me listing/id likha h toh vo new mebhi /new 
//ko id smj rha h isliye

    //New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate("reviews");
      if(!listing){
        //  await newListing.save(); 1
        return res.redirect("/listings");
    }
    res.render("listings/show", {listing});
  
})
);

//Create Route
router.post("/",
    validateListing,
    wrapAsync(async(req,res,next)=>{
    //let {title, description, image,price,country,location}=req.body;
// Handle image URL properly for new listings
    if (req.body.listing.image && req.body.listing.image.url) {
      req.body.listing.image = {
        url: req.body.listing.image.url,
        filename: 'listingimage'
      };
    } else {
      // If no image URL provided, set to null to use default
      req.body.listing.image = null;
    }
     const newListing=new Listing(req.body.listing)//2
    await newListing.save();
    return res.redirect("/listings");
})
);
//Edit Route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
     let {id}=req.params;
    const listing=await Listing.findById(id);

    if(!listing){
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
})
);
//Update Route
router.put("/:id",
   validateListing,
    wrapAsync(async(req,res)=>{
    let { id }=req.params;
    // Handle image URL properly
    if (req.body.listing.image) {
      req.body.listing.image = {
        url: req.body.listing.image,
        filename: 'listingimage'
      };
    } else if (req.body.listing.image === "") {
      // If image URL is empty string, set to null to use default
      req.body.listing.image = null;
    }
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
   return res.redirect(`/listings/${id}`);
})
);
//Delete Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})
);
module.exports=router;