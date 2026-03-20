import Resource from "../models/resource.model.js";

export const getResources = async (req, res) => {
  try {
    let { page = 1, limit = 10, category, search } = req.query;

    page = Math.max(1, parseInt(page));
    limit = Math.min(50, parseInt(limit));

    const skip = (page - 1) * limit;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const total = await Resource.countDocuments(query);

    const data = await Resource.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};