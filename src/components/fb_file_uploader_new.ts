

export default async (
    storage,
    filename,
    imageFile,
    ref,
    uploadBytes,
    getDownloadURL
 ) => {
  try {
    // Create a storage reference
    const storageRef = ref(storage, filename);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, imageFile);
    console.log('Uploaded a blob or file!');

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Return the download URL
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file', error);
    throw error; // Re-throw the error for the caller to handle
  }
}
