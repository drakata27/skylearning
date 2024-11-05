const getImageName = (data) => {
  let imagePath = "No cover";

  if (data.cover) {
    imagePath = data.cover;
  }

  const getImageName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  const imageName = getImageName(imagePath);
  return imageName;
};

export default getImageName;
