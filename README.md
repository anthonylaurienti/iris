# About

This is a project all in Js to make integration to IRIS device


## Flux

1- Scan the qrcode this will send you to the /ping endpoint and give the wan ip 

2- Check what was the last image that are storaged in the database

3- Send new images to be stored

4- Check if the image was sended ok

5- Close the connection

### Extra 
one endpoint to read the images 

# Documentation 

| Endpoint | Method | Input | Output | Error |
|----------|--------|-------|--------|-------|
| /        | GET    | -     | `{ message: 'Hello, World!' }` | - |
| /ping    | GET    | -     | `{ ip: '<wanIp>' }` | - |
| /sync_date | POST | `{ deviceID: string, providerID: string }` | `{ lastSync: date }` | `{ error: 'No register found' }` |
| /qrcode  | GET    | -     | `{ qrcode: '<qrCode>', url: '<wanIp>:<port>' }` | - |
| /images  | POST   | `{ Image: file, <other fields> }` | `{ state: 'OK' }` | `{ ERROR: error }` |
| /images/:fileName | GET | - | Image file | `{ error: 'Failed to retrieve image.' }` |
| /check   | POST   | `{ pid: string, sessionID: string, devID: string }` | `{ pid: string, imgs: string }` | `{ message: error.message }` |
| /end     | GET    | -     | `{ state: 'OK' }` | `{ error: error.message }` |

wanIp represents the WAN IP address returned by ImageService.getWanIp().

qrCode represents the QR code string returned by ImageService.generateQRCode(wanIp).

port represents the port number used in the application.

other fields represents any other fields you want to send along with the image file.

Image file represents the actual image file retrieved from the /images/:fileName endpoint.
