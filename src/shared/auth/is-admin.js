const { BadRequestErr } = require("../errors");

const isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "super_admin") {
      return res.status(403).json({
        error: "Ruxsat berilmagan.",
      });
    }
    next();
  } catch (error) {
    // throw new BadRequestErr("Unauthorized! Ruxsat berilmagan!", error);
    next(error);
  }
};

module.exports = isAdmin;
