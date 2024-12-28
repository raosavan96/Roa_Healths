const url = `https://api.cloudinary.com/v1_1/dbqczbaju/image/upload`;

const uploadImage = async (image) => {
 
  if (image) {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rao_healths");

    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData
    });

    return dataResponse.json();
  } else {
    console.log("image not uploaded..");
  }
};

export default uploadImage;
