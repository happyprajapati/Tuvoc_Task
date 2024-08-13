import jwt from "jsonwebtoken";
export const FetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({
      status: 401,
      status: "failure",
      message: "Invalid Tokend",
      data: { message: "Invalid Token" },
    });
  } 
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({
        status: 401,
        status: "failure",
        message: "Invalid Token",
        data: { message: "Invalid Token" },
      });
  }
};
