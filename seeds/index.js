const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("CONNECTION OPEN!!!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62516ab513f73bc30720c04b",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam illum quo totam atque fuga blanditiis veniam nam impedit iusto consequatur deserunt, minima accusantium autem? Vitae itaque quia adipisci mollitia recusandae.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/tab47/image/upload/v1650107796/YelpCamp/lhmn11tfi0rtjrgxskry.jpg",
          filename: "YelpCamp/lhmn11tfi0rtjrgxskry",
        },
        {
          url: "https://res.cloudinary.com/tab47/image/upload/v1650107796/YelpCamp/ajwilxjkjfzjjgkei04w.jpg",
          filename: "YelpCamp/ajwilxjkjfzjjgkei04w",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
