export const filterAudioFiles = (files) => {
  return files.filter((file) => file.typeGroup !== "audio");
};
