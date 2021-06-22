import fsAsync from 'fs/promises';

const dirCheck = async (dirPath: string) => {
  try {
    await fsAsync.access(dirPath);
  } catch (err) {
    await fsAsync.mkdir(dirPath);
  }
};

export default dirCheck;
