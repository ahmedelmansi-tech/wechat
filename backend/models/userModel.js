import { MongoClient, ObjectId } from "mongodb";
const URL = "mongodb://127.0.0.1:27017";

const localDeployment = new MongoClient(URL);

const dataBase = localDeployment.db("enterthedoor");
const userCollection = dataBase.collection("users");
const userImagesCollection = dataBase.collection("avatars");

// Add new Record
export const addNewRecord = async (newCST) => {
  const result = await userCollection.insertOne({
    ...newCST,
  });

  return result;
};

// Get Single Record (By Email)
export const getSingleRecord = async (condition) => {
  const result = await userCollection.findOne(condition);
  return result;
};

// DELETE Single Record
export const deleteSingleRecord = async (_id) => {
  const deleteResult = await userCollection.updateOne(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: {
        isDeleted: true,
      },
    },
  );
  return deleteResult;
};

// PUT   Restore Single Record
export const restoreRecord = async (_id) => {
  const restoredRecored = await userCollection.updateOne(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: {
        isDeleted: true,
      },
    },
  );
  return restoredRecored;
};

// Edite Record
export const editeRecord = async (data) => {
  const editeRecored = await userCollection.updateOne(
    {
      _id: new ObjectId(data.id),
    },
    {
      $set: {
        name: data.name,
        email: data.email,
      },
    },
  );
  return editeRecored;
};

// GET ALL Users  (DB.)
export const getAllUsers = async () => {
  const notDeletedUsers = await userCollection
    .find({ isDeleted: false })
    .toArray();
  return notDeletedUsers;
};

//-----------------------IMAGES----------------------------------//

export const userImage = async (payload) => {
  console.log(payload);
  const result = await userImagesCollection.insertOne(payload);
  return result;
};
