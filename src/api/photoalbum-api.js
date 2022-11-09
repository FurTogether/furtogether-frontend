import { apiService } from "../services/api.service";


class PhotoAlbumApi {

  async uploadPhotoAlbum({listOfFileName, dogUpload}){
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.post(`/photoalbum/uploadmultiple`, {listOfFileName, dogUpload});
        console.log(dogUpload)
        console.log('Photo uploaded')
        resolve(response)
      } catch (err){
        console.error('[Photo API]: ', err);
        reject(new Error('Internal server error'));
      }
    })
  }

  async retrievePhotoAlbum({filter}){
    return new Promise((resolve, reject) => {
      try {
        const response = apiService.post(`/photoalbum/retrievemultiple`, {filter});
        console.log('Photo retrieved')
        resolve(response)
      } catch (err){
        console.error('[Photo API]: ', err);
        reject(new Error('Internal server error'));
      }
    })
  }

  async retrievePhotoAlbumMultiple({listOfDog}){
    return new Promise((resolve, reject) => {
        try {
          console.log(listOfDog)
          const response = apiService.post(`/photoalbum/retrievemultiplefilter`, {listOfDog});
          console.log('Photo retrieved')
          resolve(response)
        } catch (err){
          console.error('[Photo API]: ', err);
          reject(new Error('Internal server error'));
        }
      })
    }

  async retrieveDogAlbum() {
      return new Promise((resolve, reject) => {
        try {
          const response = apiService.get(`/photoalbum/retrieveDogs`);
          console.log('Number of Dogs')
          resolve(response)
        } catch (err){
          console.error('[Photo API]: ', err);
          reject(new Error('Internal server error'));
      }
    })
  }



}



export const photoAlbumAPI = new PhotoAlbumApi();