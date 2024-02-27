import {Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // Maximum image size in bytes (3MB)
const handleImageArrayWhileRemove = (
  measuremntRoomImages,
  setMeasuremntRoomImages,
  setMeasuremntRoomImagesAPI,
  result,
) => {
  if (measuremntRoomImages) {
    let arr = [...measuremntRoomImages];
    result?.forEach(val => {
      arr.push(val);
    });
    setMeasuremntRoomImages(arr);
    setMeasuremntRoomImagesAPI(arr);
  } else {
    setMeasuremntRoomImages(result);
    setMeasuremntRoomImagesAPI(result);
  }
};
const LaunchImageLibraryAsync = async (
  measuremntRoomImages,
  setMeasuremntRoomImages,
  setMeasuremntRoomImagesAPI,
  docName,
  camera,
) => {
  console.log(
    'measuremntRoomImages--',
    measuremntRoomImages,
    'setMeasuremntRoomImages--',
    setMeasuremntRoomImages,
    'setMeasuremntRoomImagesAPI--',
    setMeasuremntRoomImagesAPI,
    'docName--',
    docName,
  );
  try {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      selectionLimit: 0,
      selectionLimit: docName === 'profile' ? 1 : 10,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // const response2 = await (docName === 'camera' ? launchCamera(options) : launchImageLibrary(options));
    const response = await (camera
      ? launchCamera(options)
      : launchImageLibrary(options));
    // const response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log('Image selection canceled');
    } else if (response.error) {
      console.log('Image selection error: ', response.error);
    } else {
      let res = response.assets;
      let size = res[0].fileSize;
      if (size <= MAX_IMAGE_SIZE) {
        if (docName === 'Certifications') {
          handleImageArrayWhileRemove(
            measuremntRoomImages,
            setMeasuremntRoomImages,
            setMeasuremntRoomImagesAPI,
            res,
          );
        } else if (docName === 'profile') {
          setMeasuremntRoomImagesAPI(false);
          setMeasuremntRoomImages(res[0]);
        }
      } else {
        console.log('Image size exceeds the maximum limit');
        Alert.alert('Image size exceeds the maximum limit');
        // Handle the case where the image size exceeds the limit
      }
    }
  } catch (error) {
    console.error('Error in launchImageLibraryAsync:', error);
  }
};

const launchImageLibrarY = async (docName, limit) => {
  const options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.8,
    // selectionLimit: 2,
    // selectionLimit: 2 - limit,
    selectionLimit: docName === 'profile' ? 1 : 10,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  launchImageLibrary(options, response => {
    console.log(response, 'check response');
    if (response.didCancel) {
      console.log('Image selection canceled');
    } else if (response.error) {
      console.log('Image selection error: ', response.error);
    } else {
      // Check the image size
      let res = response.assets;
      // console.log(res[0].fileSize, 'lets');
      let size = res[0].fileSize;
      console.log(size, '----------size-----------', MAX_IMAGE_SIZE);
      if (size <= MAX_IMAGE_SIZE) {
        // Image is within the acceptable size range
        // console.log('Selected image:', res.uri);
        if (docName == 'Certifications') {
          handleImageArrayWhileRemove(Certifications, setCertifications, res);
        } else if (docName == 'GovernmentID') {
          handleImageArrayWhileRemove(GovernmentID, setGovernmentID, res);
        } else if (docName == 'medicalCertificate') {
          handleImageArrayWhileRemove(
            MedicalCertificate,
            setMedicalCertificate,
            res,
          );
        } else if (docName == 'profile') {
          setprofile(res);
        }
      } else {
        console.log('Image size exceeds the maximum limit');
      }
    }
  });
};
export default LaunchImageLibraryAsync;
