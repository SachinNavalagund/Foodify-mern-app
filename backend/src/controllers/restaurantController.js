import Restaurant from "../models/restaurantModel.js";

export const searchRestaurants = async (req, res) => {
  try {
    const city = req.params.city;
    const searchQuery = req.query.searchQuery || "";
    const selectedCuisines = req.query.selectedCuisines || "";
    const sortOption = req.query.sortOption || "";
    const page = parseInt(req.query.page) || 1;

    let query = {};

    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);
    console.log(cityCheck);

    if (cityCheck === 0) {
      return res.status(404).json({
        data: [],
        pagination: {
          total: 0,
          page: 1,
          pages: 1,
        },
      });
    }

    if (selectedCuisines) {
      const cuisinesArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisinesArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");

      query["$or"] = [
        { restaurantName: searchRegex },
        { cuisines: { $in: [searchRegex] } },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    //TODO : sort()

    // let sortObject = {};
    // if (sortOption) {
    //   // Assuming sortOption is in the format "field" or "field:order" (e.g., "name" or "name:desc")
    //   const [field, order] = sortOption.split(":");
    //   if (field) {
    //     sortObject[field] = order === "desc" ? -1 : 1; // Default to ascending if no order specified
    //   }
    // }
    // .sort({ [sortOption]: 1 })

    const restaurants = await Restaurant.find(query)

      .skip(skip)
      .limit(pageSize)
      .lean();
    console.log(restaurants);

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("Error in searchRestaurants controller", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
