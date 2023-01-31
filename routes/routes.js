const express = require('express');
const Image = require('../models/image');
const router = express.Router();
const multer = require('../config/multer');
const ImageService = require('../services/image.service');
const path = require('path');

require('dotenv').config();
const port = process.env.IRIS_PORT || 3000

router.get('/', (req, res) => {
  res.send({ message: 'Hello, World!' });
});

router.get('/ping', async (req, res) => {
  const wanIp = await ImageService.getWanIp();
  res.send({ ip: wanIp  });
});

router.post("/sync_date", async (req, res) => {
  try {
    const { deviceID, providerID } = req.body;
    const lastSync = await ImageService.syncDate(deviceID, providerID);
    if (!lastSync) {
      return res.status(404).send({ error: "No register found" });
    }
    res.json(lastSync);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/qrcode', async (req, res) => {
  const wanIp = await ImageService.getWanIp();
  const qrCode = await ImageService.generateQRCode(wanIp);
  res.send({ qrcode: qrCode, url :wanIp+':'+port  });
});

router.post('/images', multer.single('Image'), async (req, res) => {
  try {
    const result = await ImageService.saveImage({
      ...req.body,
      Image: `/images/${req.file.filename}`
    });
    res.json({"state":"OK"});
  } catch (error) {
    console.log(error);
    res.status(500).json({"ERROR":error})
  }
});

router.get("/images/:fileName", (req, res) => {
  try {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, '..', 'images', fileName);
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve image." });
  }
});

router.post("/check", async (req, res) => {
  try {
    const { pid, sessionID, devID } = req.body;
    const images = await Image.find({ Pid:pid, sessionID, devID });
    const wanIp = await ImageService.getWanIp();
    const imgs = images.map(image => wanIp+":"+port+image.Image).join(";");
    res.json({ pid, imgs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/end', (req, res) => {
  try {
    res.status(200).json({ state: 'OK' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
