import {Alert} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // Maximum image size in bytes (3MB)
const handleImageArrayWhileRemove = (
  measuremntRoomImages,
  setMeasuremntRoomImages,
  result,
) => {
  if (measuremntRoomImages) {
    let arr = [...measuremntRoomImages];
    result?.forEach(val => {
      arr.push(val);
    });
    setMeasuremntRoomImages(arr);
  } else {
    setMeasuremntRoomImages(result);
  }
};
const LaunchImageLibraryAsync = async (
  measuremntRoomImages,
  setMeasuremntRoomImages,
  docName,
) => {
  console.log('docName', docName);
  try {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      selectionLimit: docName === 'profile' ? 1 : 3,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const response = await launchImageLibrary(options);
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
            res,
          );
        } else if (docName === 'profile') {
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

export default LaunchImageLibraryAsync;
