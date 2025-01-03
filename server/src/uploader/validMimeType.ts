const validImageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const validFileMimeTypes = ['file/pdf'];

export const validAllFileMimeTypes = {
  dp: validImageMimeTypes.concat(validFileMimeTypes),
  background: validImageMimeTypes,
};
