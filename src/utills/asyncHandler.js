const asyncHandler =(fn)=>async(req,res,next)=>{
    try{
        await fn(req,res,next);
    }
    catch(error){
         console.error(`Error in route ${req.method} ${req.originalUrl}:`, error);
        res.status(error.statusCode || 500).json({
            statusCode:error.statusCode,
            success:false,
            message:error.message
        })
    }
}
export {asyncHandler};