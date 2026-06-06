import Message from "../models/MessageSchema.js";
import User from "../models/userSchema.js";

export const getAllCurrentUsers = async (req, res) => {
  const currentUserId = req.authUser._id;
  const myContacts = await User.find({ _id: { $ne: currentUserId } });
  res.status(200).json({
    message: "MESSAGE ROUTE IS GOOD",
    count: myContacts.length,
    currentUserId,
    myContacts,
  });
};

export const getMessagesWithOtherContact = async (req, res) => {
  const currentLoggedUserId = req.authUser._id;
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
  const from = req.authUser._id;
  const to = req.params.id;

  const newMessage = {
    senderId: from,
    receiverId: to,
    text: messagePayload.text,
    image: messagePayload.image,
  };
  const message = await Message.create(newMessage);

  res.status(201).json({
    note: "message sent ...",
    message,
  });
};

export const chatPartners = async (req, res) => {
  const loggedInUserId = req.authUser._id;
  const iam = await User.findById(loggedInUserId);

  // Detect whether iam the sender or the reciever
  const chatingWith = await Message.find({
    $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
  });

  // console.log("SMS", chatingWith);

  // so Wrapping in new Set will remove duplication and ... in new []
  const myContactsId = [
    ...new Set(
      chatingWith.map((message) => {
        return message.senderId.toString() === loggedInUserId.toString()
          ? message.receiverId.toString()
          : message.senderId.toString();
      }),
    ),
  ];

  console.log("My Contacts IDS is ", myContactsId);
  // fetch the contacts

  const talkedTo = await User.find({ _id: { $in: [...myContactsId] } }).select(
    "-password -isDeleted -__v",
  );

  res.status(200).json({
    me: iam.name,
    message: "PARTENARS",
    myContactsId,
    talkedTo,
  });
};
