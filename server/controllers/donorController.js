import User from "../models/user.js";


// ✅ Add donor
export const addDonor = async (req, res) => {
  try {
    const {
      name,
      bloodGroup,
      phone,
      address,
      city,
      age,
      gender,
      lastDonationDate,
      available,
      notes
    } = req.body;

    const donor = new User({
      name,
      bloodGroup,
      phone,
      address,
      city,
      age,
      gender,
      lastDonationDate,
      available,
      notes,
      role: "donor"
    });

    await donor.save();

    res.status(201).json({ message: "Donor added successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding donor" });
  }
};


// ✅ Get all donors + filter (bloodGroup & city)
export const getDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    let filter = { role: "donor" };

    if (bloodGroup) {
      filter.bloodGroup = {
        $regex: bloodGroup.trim(),
        $options: "i"
      };
    }

    if (city) {
      filter.city = {
        $regex: city.trim(),
        $options: "i"
      };
    }

    const donors = await User.find(filter).select("-password");

    res.json(donors);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching donors" });
  }
};


// ✅ Get donors by blood group (only available donors)
export const getDonorsByBlood = async (req, res) => {
  try {
    const { bloodGroup } = req.params;

    const donors = await User.find({
      role: "donor",
      bloodGroup: { $regex: bloodGroup, $options: "i" },
      available: true
    }).select("-password");

    res.json(donors);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching donors by blood group" });
  }
};


// 🔥 NEW: Dashboard Stats API
export const getStats = async (req, res) => {
  try {
    // ✅ Only count donors (not all users)
    const total = await User.countDocuments({ role: "donor" });

    const available = await User.countDocuments({
      role: "donor",
      available: true
    });



    res.json({
      total,
      available,
      requests: 0 // (we will implement later)
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching stats" });
  }
};