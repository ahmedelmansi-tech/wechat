import Message from "../models/MessageSchema.js";
import User from "../models/userSchema.js";

export const getAllCurrentUsers = async (req, res) => {
  const currentUserId = req.authUser._id;
  const myContacts = await User.find({ _id: { $ne: currentUserId } });
  res.status(200).json({
    message: "MESSAGE ROUTE IS GOOD",
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

  // Detect whether iam the sender or the reciever
  const result = await Message.find({
    $or: [
      {
        senderId: loggedInUserId,
      },
      {
        receiverId: loggedInUserId,
      },
    ],
  });

  // so Wrapping in new Set will remove duplication and ... in new []
  const myContactsId = [
    ...new Set(
      result.map((msg) =>
        msg.senderId.toString() === loggedInUserId.toString()
          ? msg.receiverId.toString()
          : msg.senderId.toString(),
      ),
    ),
  ];

  console.log(myContactsId);
  // fetch the contacts

  const partenars = await User.find({ _id: { $in: [...myContactsId] } });

  res.status(200).json({
    message: "PARTENARS",
    myContactsId,
    partenars,
  });
};
