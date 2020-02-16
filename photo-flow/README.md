# Photo-Flow [pre-alpha]
A system to handle upload, processing, and delivery of photos

## Architecture
The system is broken into three core parts:
- UI
- Workers
- Notifications

## UI [in progress]
The UI allows the user to:
- create an account, sign in, and sign out
- upload a photo or a folder of photos (as .raw extension)
- receive a notification when a photo process finishes and view & download the finished file

It is built using Vue.js and can be found in the `webapp` directory.

## Workers [in progress]
Workers are scripts that are triggered by http requests. Firebase functions will trigger these when the UI takes a certain action.

### `.raw` to `.jpg` converter
Downloads `.raw` image files and uploads as processed `.png` files

1. download from folder: /{username}/uploads and process images
2. once completed upload the file, with the original to /{username}/completed

## Notifications [in progress]
We will need logic to run the workers when jobs are ready and to update the ui when jobs are completed. This will be built with firebase functions and notifications will be managed using pusher.
