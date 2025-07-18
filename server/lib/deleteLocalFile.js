import fs from "fs";

const deleteLocalFile = async (fileName) => {
  const root = "./public/uploads/";
  const path = root + fileName;
  // console.log(path);

  try {
    fs.unlinkSync(path);
    // console.log(`File ${fileName} successfully deleted`);
  } catch (err) {
    console.log("error", err);
  }
};

export default deleteLocalFile;
