import { validationResult } from "express-validator";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import MessDetialsModel from "../models/MessDetailsModel.js";

//* Create a User
export const createUser = async (req, res) => {
  try {
    console.log("Create User function Called (/user/signup)");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(200).json({
        code: 200,
        status: "failure",
        message: "Enter correct credentials",
        data: { message: "Enter correct credentials" },
      });
    }

    const { name, email, password } = await req.body;

    const saltPassword = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, saltPassword);

    const user = await UserModel.create({
      name,
      email,
      password: secPassword,
    });
    res.json({
      code: 200,
      status: "success",
      message: "User created",
      data: { message: "User created", userId: user._id },
    });
    console.log("Create User function Finished (/user/signup)");
  } catch (error) {
    console.log(error);
    res.json({
      code: 500,
      status: "failure",
      message: "Enter different email ID",
      data: { message: "Enter different email ID" },
    });
  }
};

//* Login User
export const loginUser = async (req, res) => {
  try {
    console.log("Login User function Called (/user/login)");
    const { password } = await req.body;
    let email1 = await req.body.email;
    let email = email1.toLowerCase();

    const user = await UserModel.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const data = {
          user: {
            id: user.id,
          },
        };

        const jwtData = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({
          code: 200,
          status: "success",
          message: "User logged in successfully",
          data: { authToken: jwtData, user },
        });
      } else {
        res.status(200).json({
          code: 200,
          status: "failure",
          message: "Invalid Password",
          data: { message: "Invalid Password" },
        });
      }
    } else {
      res.status(200).json({
        code: 200,
        status: "failure",
        message: "User not found",
        data: { message: "User not found" },
      });
    }

    console.log("Create User function Finished (/user/login)");

  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "failure",
      message: "Something went wrong",
      data: { message: "Something went wrong" },
    });
  }
};

//* Get All Users
export const getAllUsers = async (req, res) => {
  try {
    console.log("Get all user User function Called (/user/getallusers)");
    const users = await UserModel.find();
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Get all users",
      length: users.length,
      data: { users },
    });
    console.log("Get all user User function Finished (/user/getallusers)");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ code: 500, status: "failure", message: "Something went wrong" });
  }
};

//* Get a user
export const getUser = async (req, res) => {
  try {
    console.log("Get a user User function Called (/user/getuser)");
    let userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");
    res.json({ status: "success", user });
    console.log("Get a user User function Finished (/user/getuser)");
  } catch (error) {
    console.log(error);
    res.json({ status: "failure", error: error.message });
  }
};

// //* Login mess manager
// export const loginMessManager = async (req, res, next) => {
//   try {
//     if (req.body.type === 1) {
//       console.log("Login User function Called for manager (/user/login)");
//       const { password } = await req.body;
//       let email1 = await req.body.email;
//       let email = email1.toLowerCase();

//       const user = await UserModel.findOne({ email });
//       if (user) {
//         if (await bcrypt.compare(password, user.password)) {
//           const data = {
//             user: {
//               id: user.id,
//               type: user.type,
//             },
//           };

//           const jwtData = jwt.sign(data, process.env.JWT_SECRET);
//           res.status(200).json({
//             code: 200,
//             status: "success",
//             message: "Manager logged in successfully",
//             data: { authToken: jwtData, name: user.name, email: user.email },
//           });
//         }
//       } else {
//         res.status(200).json({
//           code: 200,
//           status: "failure",
//           message: "Manager not found",
//           data: { message: "Manager not found" },
//         });
//         console.log("Login User function Finished for manager (/user/login)");
//       }
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       code: 500,
//       status: "failure",
//       message: "Something went wrong",
//       data: { message: "Something went wrong" },
//     });
//   }
// };

//? get mess details
export const getmessdetails = async (req, res) => {
  try {
    // console.log("Get Mess Details function Called (/user/messdetails)");
    // const messdetails = await MessDetialsModel.find()
    // if (messdetails.length > 0) {
    //   res.status(200).json({
    //     code: 200,
    //     status: "success",
    //     length: messdetails.length,
    //     message: "Mess details fetched",
    //     data: { messdetails },
    //   });
    // }
    // else {
    //   res.status(404).json({
    //     code: 404,
    //     status: "failure",
    //     message: "Mess details not found",
    //     data: { message: "Mess details not found", },
    //   });
    // }
    // console.log("Get Mess Details function Finished (/user/messdetails)");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "failure",
      message: "Something went wrong",
      data: { message: "Something went wrong" },
    });
  }
};
