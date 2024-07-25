export const getFirstImage = (imagesString: string | undefined): string => {
  if (!imagesString) return "";
  const images = imagesString.split(",");
  const firstImage = images[0].trim();
  return `https://agenda.cultura.gencat.cat/${firstImage}`;
};

export const getAllImages = (imagesString: string | undefined): string[] => {
  if (!imagesString) return [];
  const images = imagesString.split(",").map((image) => image.trim());
  return images.map((image) => `https://agenda.cultura.gencat.cat${image}`);
};
