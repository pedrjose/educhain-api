export const corsAuth = (req, res, next) => {
  try {
    const allowedOrigins = ["http://localhost:5173", "*"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }

    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
