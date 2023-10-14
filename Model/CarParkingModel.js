const mongoose=require("mongoose")

const parkingSlotSchema=mongoose.Schema({
    slotNumber:{
        type:Number,
        unique:true,
        required: true,
    },
    carNumber:{
        type:String,
        unique:true,
        required: true,
    },
})

const ParkingSlotModel=mongoose.model("ParkingSlot",parkingSlotSchema);

module.exports={
    ParkingSlotModel
}