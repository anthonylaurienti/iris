const Image = require('../models/image');
const qrcode = require('qrcode');
const os = require('os');
require('dotenv').config();
const port = process.env.IRIS_PORT || 3000

const saveImage = async (imageData) => {
  try {
    const image = new Image(imageData);
    const savedImage = await image.save();
    return savedImage;
  } catch (error) {
    throw error;
  }
};

const deleteImage = async (query) => {
  try {
    const deletedImage = await Image.deleteOne(query);
    return deletedImage;
  } catch (error) {
    throw error;
  }
};

const generateQRCode = async (wanIp) => {
  const qrCodeUrl = `http://${wanIp}:${port}/ping`;
  const qrCode = await qrcode.toDataURL(qrCodeUrl);
  return qrCode
}

const getWanIp = () => {
  const networkInts = os.networkInterfaces();
  let wanIp;
  for (const name of Object.keys(networkInts)) {
    for (const netInt of networkInts[name]) {
      if (netInt.family === 'IPv4' && !netInt.internal) {
        wanIp = netInt.address;
        break;
      }
    }
  }
  return wanIp
}

const syncDate = async (deviceID, providerID) => {
  try {
    const lastRegister = await Image.findOne({ devID: deviceID, Pid: providerID }).sort({createdAt: -1});
    if (!lastRegister) {
      throw new Error("No register found");
    }
    return {
      devID: deviceID,
      providerID: providerID,
      lastSync: lastRegister.Data
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveImage,
  deleteImage,
  generateQRCode,
  getWanIp,
  syncDate
};