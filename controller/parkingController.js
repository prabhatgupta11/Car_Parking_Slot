const {ParkingSlotModel} = require('../Model/CarParkingModel');

//======================park the slot================================

const parkCar = async (req, res) => {
  try {
    const { carNumber } = req.body;
    const availableSlot = await ParkingSlotModel.findOne({ carNumber: null }).sort('slotNumber');
   
    
    if (!availableSlot) {
     return res.status(400).json('Parking lot is full. No available slots.');
    }

    const data = await ParkingSlotModel.findOneAndUpdate(
      { _id: availableSlot._id },
      { carNumber: carNumber },
      { new: true }
    );

    res.json({ success: true, message: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//======================Unpark the slot================================


const unparkCar = async (req, res) => {
  try {
    const { slotNumber } = req.body;
    const parkingSlot = await ParkingSlotModel.findOne({ slotNumber });

    if (!parkingSlot) {
      res.status(400).json(`Slot ${slotNumber} is invalid.`);
      
    //  throw new Error(`Slot ${slotNumber} is invalid.`);
    }

    if (!parkingSlot.carNumber) {
      res.status(400).json(`Slot ${slotNumber} is already empty.`);
      //throw new Error(`Slot ${slotNumber} is already empty.`);
    }

    const data = await ParkingSlotModel.findOneAndUpdate(
      { _id: parkingSlot._id },
      { carNumber: null },
      { new: true }
    );

    res.json({ success: true, message: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


//======================Get route================================



const getCarSlotInformation = async (req, res) => {
  try {
    const param = req.params.param;
    let query;

    if (isNaN(param)) {
      query = { carNumber: param };
    } else {
      query = { slotNumber: param };
    }

    const parkingSlot = await ParkingSlotModel.findOne(query);

    if (!parkingSlot) {
      return res.status(201).json('No information found for the provided param.');
    }

    res.json({
      success: true,
      carNumber: parkingSlot.carNumber,
      slotNumber: parkingSlot.slotNumber,
    });

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  parkCar,
  unparkCar,
  getCarSlotInformation,
};
