// Dependances
import Joi from "joi";
import bcrypt from "bcrypt";
import { jwtInCookies } from "../utilities/gentoken.cookies.js";
import { sendWelcomeEmail } from "../emails/emailHandler.js";
import cloudinary from "../lib/cloudinary.js";

//*******************************************/
// Model Methods
// ### User MODEL
import User from "../models/userSchema.js";
// import {
//   addNewRecord,
//   getSingleRecord,
//   deleteSingleRecord,
//   restoreRecord,
//   editeRecord,
//   getAllUsers,
//   userImage,
// } from "../models/userModel.js";

// @ Add new User - /register
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if the Email Already taken or registered
  // const isExisting = await getSingleRecord({ email }); //MONGO-DRIVE

  const isRegisterdBefore = await User.findOne({ email });

  if (isRegisterdBefore) {
    return res.status(400).json({
      status: "ERROR",
      message: `${email} is already registered`,
    });
  }

  // SCHEMA JOI
  const userSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(15)
      // .alphanum()
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "io"] },
      })
      .min(3)
      .max(40)
      .required(),
    password: Joi.string()
      .pattern(new RegExp(`^[a-zA-Z0-9]{8,25}$`))
      .required(),
    confirm_password: Joi.ref("password"),
    isDeleted: Joi.boolean(),
  });

  // JUST FYI
  // Width بتاخد peers ('name' , ['email','pas','confirm_pas','ECT....'])
  // with("name", "email", "password", "confirm_password");
  const { error, value } = userSchema.validate(req.body);
  if (error) {
    throw new Error(error);
  } else {
    // Here Time To hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPs = bcrypt.hashSync(password, salt);

    // The new Record that will be sent to the database
    const payload = {
      name,
      email,
      password: hashedPs,
    };

    const newUser = await User.create(payload);
    const token = await jwtInCookies(newUser._id, res);

    // Sending welcome Email
    if (newUser) {
      await sendWelcomeEmail(newUser.email, newUser.name);
    }

    res.status(201).json({
      status: "success",
      data: await User.findOne({ email }).select("-password"),
      token,
    });
  }
};

// @ Sign in - /login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // case : User did't input the Creditential
  if (email === "" || password === "") {
    return res.status(400).json({
      status: "error",
      message: "fill in all the feilds",
    });
  }
  // const logInUser = await getSingleRecord({ email });

  const logInUser = await User.findOne({ email });

  // Case : User Didn't Register
  if (!logInUser) {
    return res.status(400).json({
      message: `${email} is not registered`,
      status: "error",
    });
  }

  // Case : User Founded and validates the Password
  if (await bcrypt.compare(password, logInUser.password)) {
    await jwtInCookies(logInUser._id, res);
    return res.status(200).json({
      message: `welcome ${logInUser.name}`,
      data: await User.findOne({ email }).select("-password"),
      // token: await jwtInCookies(logInUser._id, res),
    });
  } else {
    return res.status(400).json({
      status: "Error",
      message: "invalid credientials",
    });
  }
};

// @ update profile pic /update-profile
export const updateProfile = async (req, res) => {
  // Handling the Profile Pic In the Cloudinary Side

  // console.log(req.file);
  //    {
  //   fieldname: 'profile_pic',
  //   originalname: 'quote-icon.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   destination: 'uploads',
  //   filename: 'quote-icon-7a952fcb-6e74-4de4-806a-52700a28be56.png',
  //   path: 'uploads\\quote-icon-7a952fcb-6e74-4de4-806a-52700a28be56.png
  //   size: 1180
  // }
  try {
    console.log("iam the authorized User", req.authorizedUser);

    const { secure_url } = await cloudinary.uploader.upload(req.file.path);
    if (secure_url) {
      await User.findByIdAndUpdate(
        { _id: req.authorizedUser._id },
        {
          profile_pic: secure_url,
        },
      );
    }
  } catch (error) {
    throw new Error("Failed to upload resources ..", error.message);
  }
  res.status(200).json({
    message: "Profile updated",
    loggedUser: await User.findOne({ _id: req.authorizedUser._id }).select(
      "-password",
    ),
  });
};

export const logOut = (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({
    message: "Logged-Out sucessfully",
  });
};
//---------------------------------------------------------------------------------------------------------------------------------//

// export const register = async (req, res) => {
//   const { email, password } = req.body;
//   // Check If it is a User Or new User
//   const currentUser = await getSingleRecord({ email });

//   if (!currentUser || currentUser === null) {
//     return res.status(401).json({
//       message: "user not found ",
//       status: "ERROR",
//     });
//   } else {
//     // If the user founded compare the hashed PS on the Database Wiz the one the User Typed
//     const isMatched = await bcrypt.compare(password, currentUser.password);
//     if (isMatched) {
//       res.status(200).json({
//         sms: "LOGIN ACCOMPLISHED",
//         email,
//         name: currentUser.name,
//         password,
//         token: await genToken(currentUser._id),
//       });
//     }
//   }
// };

// Login    -  /login
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   // case : User did't input the Creditential

//   if (email === "" || password === "") {
//     return res.status(400).json({
//       status: "error",
//       message: "fill in all the feilds",
//     });
//   }

//   const logInUser = await getSingleRecord({ email });

//   // Case : User Didn't Register
//   if (!logInUser) {
//     return res.status(400).json({
//       message: `${email} is not registered`,
//       status: "error",
//     });
//   }

//   // Case : User Founded and validates the Password
//   if (await bcrypt.compare(password, logInUser.password)) {
//     return res.status(200).json({
//       message: `welcome ${logInUser.name}`,
//       data: logInUser,
//     });
//   } else {
//     return res.status(400).json({
//       status: "Error",
//       message: "Password is invalid",
//     });
//   }
// };

// export const editeUser = async (req, res) => {
//   const userEditeId = req.params.id;
//   const { modifiedCount, matchedCount } = await restoreRecord(userEditeId);

//   if (matchedCount === 1 && modifiedCount === 0) {
//     return res.status(400).json({
//       status: "ERROR",
//       code: "400",
//       message: `#${userEditeId} may be restored before`,
//     });
//   } else if (matchedCount === 0) {
//     return res.status(400).json({
//       status: "ERROR",
//       code: "400",
//       message: `#${userEditeId} not found`,
//     });
//   }

//   return res.status(200).json({
//     message: `#${userEditeId} restored Successfuly`,
//     id: userEditeId,
//   });
// };

// edite user data
// export const editeUserData = async (req, res) => {
//   let newUserData = req.body;
//   newUserData.id = req.params.id;

//   const isFound = await getSingleRecord({ email: newUserData.email });
//   console.log("IS FOUNDED ", isFound);
//   console.log(newUserData);
//   if (isFound !== null && isFound._id.toString() !== newUserData.id) {
//     return res.status(400).json({
//       message: "SAMA MASAS",
//     });
//   }
//   const result = await editeRecord(newUserData);
//   res.status(200).json({
//     message: "Edite",
//     result,
//   });
// };

// export const deleteUser = async (req, res) => {
//   const userId = req.params.id;

//   const delUser = await deleteSingleRecord(userId);
//   res.status(200).json({
//     message: `DELETE In USERS ${userId}`,
//     data: delUser,
//   });
// };

// Upload
// export const imageUpload = async (req, res) => {
//   const user_image = req.body.image;
//   console.log("REQUEST is ", userImage);
//   await userImage({ image: user_image });
//   console.log(req.file);

//   res.status(200).json({
//     message: `file ${req.file.originalname} uploaded`,
//   });
// };

// @ get All users
// export const getusers = async (req, res) => {
//   const notDeletedOnly = await getAllUsers();
//   res.status(200).json({
//     message: "GET In USERS ",
//     list: notDeletedOnly,
//   });
// };
