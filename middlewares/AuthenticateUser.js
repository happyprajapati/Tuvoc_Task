import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
export const AuthenticateUser = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token)
  if (!token) {
    res.status(401).send({
      status: 401,
      status: "failure",
      message: "Invalid Token",
      data: { message: "Invalid Token" },
    });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    const findUser = UserModel.findById(data.user.id)
    if (!findUser) {
      res.status(401).send({
        status: 401,
        status: "failure",
        message: "Invalid access",
        data: { message: "Invalid access" },
      });
    }
    next();
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 401,
      status: "failure",
      message: "Invalid Tozken",
      data: { message: "Invalzid Token" },
    });
  }
};
