const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://shakyaversha123:abdhesh123@gohotel.zrwprdd.mongodb.net/goHotel?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");

    const db = mongoose.connection.db;
    const fatchdata = db.collection("foodItems");

    const data = await fatchdata.find({}).toArray();
    const foodCategory = await db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.error("Connection error", error);
  }
};

module.exports = mongoDB;
