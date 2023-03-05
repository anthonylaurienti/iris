const qrcode = require('qrcode');
const os = require('os');
require('dotenv').config();
const {saveimageData, getLast, getImages} = require("../repository/patient.repository")
const port = process.env.IRIS_PORT || 3000
const fs = require('fs');

const saveImage = async (imageData) => {
  try {
    const ImageName = imageData.ImageName
    const filePath = `/images/${ImageName}`;
    await saveimageData(imageData,filePath)
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
      if (netInt.family === 'IPv4' && !netInt.internal && name.includes("wlp")) {
        wanIp = netInt.address;
        break;
      }
    }
  }
  return wanIp
}

const syncDate = async (deviceID,providerID,callback) => {
  try {
    getLast(deviceID,(lastRegister)=>{
      if (!lastRegister) {
        throw new Error("No register found");
      }
      callback({
        devID: deviceID,
        providerID: providerID,
        lastSync: lastRegister.DataSended
      });
    });
  } catch (err) {
    throw err;
  }
};

const findImage = (pid,sessionID,devID, callback)=> {
  try {
    getImages(pid,sessionID,devID,(response)=>{
      callback(response)
    })
  } catch (error) {
    throw new Error("No register found");
  }

}

module.exports = {
  saveImage,
  generateQRCode,
  getWanIp,
  syncDate,
  findImage
};
