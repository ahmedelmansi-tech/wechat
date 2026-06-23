import Message from "../models/MessageSchema.js";
import User from "../models/userSchema.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllCurrentUsers = async (req, res) => {
  const meId = req.authorizedUser._id;
  const contacts = await User.find({ _id: { $ne: meId } });
  res.status(200).json({
    message: "all contacts",
    count: contacts.length,
    data: contacts,
  });
};

export const getMessagesWithOtherContact = async (req, res) => {
  const currentLoggedUserId = req.authorizedUser._id;
  const recieverUserId = req.params.id;

  const messagesBetweenUs = await Message.find({
    $or: [
      { senderId: currentLoggedUserId, receiverId: recieverUserId },
      { senderId: recieverUserId, receiverId: currentLoggedUserId },
    ],
  });

  res.status(200).json({
    message: `these conversation happen between ${currentLoggedUserId} and ${recieverUserId}`,
    talks: messagesBetweenUs,
    numberOfMessages: messagesBetweenUs.length,
  });
};

export const sendAmessage = async (req, res) => {
  const messagePayload = req.body;
  const messageImage = req?.file;
  const from = req.authorizedUser._id;
  const to = req.params.id;

  let newMessage = null;
  if (messageImage) {
    const { secure_url } = await cloudinary.uploader.upload(messageImage.path);

    if (secure_url) {
      newMessage = {
        senderId: from,
        receiverId: to,
        text: messagePayload.text,
        image: secure_url,
      };
    }
  } else {
    newMessage = {
      senderId: from,
      receiverId: to,
      text: messagePayload.text,
      image: "",
    };
  }
  const message = await Message.create(newMessage);

  res.status(201).json({
    note: "message sent ...",
    message,
  });
};

export const chatPartners = async (req, res) => {
  const loggedInUserId = req.authorizedUser._id;
  const iam = await User.findById(loggedInUserId);

  // Detect whether iam the sender or the reciever
  const chatPartners = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  // so Wrapping in new Set will remove duplication and ... in new []
  const talkedBeforeContacts = [
    ...new Set(
      chatPartners.map((chat) => {
        return chat.senderId.toString() === loggedInUserId.toString()
          ? chat.receiverId.toString()
          : chat.senderId.toString();
      }),
    ),
  ];

  // console.log("My Contacts IDS is ", talkedBeforeContacts);
  // fetch the contacts
  const talkedBeforeToContacts = await User.find({
    _id: { $in: [...talkedBeforeContacts] },

    isDeleted: false,
  });

  // const whoIcontactedBefore = await User.find({
  //   _id: { $ne: loggedInUserId },
  // });

  res.status(200).json({
    me: iam.name,
    message: "PARTENARS",
    talkedBeforeContacts,
    talkedBeforeToContacts,
    // whoIcontactedBefore,
  });
};
