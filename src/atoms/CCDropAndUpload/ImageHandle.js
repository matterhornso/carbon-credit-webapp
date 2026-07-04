const FileUploadEndpoint =
  'https://climatdev-api.shinetrace.com/carbon/api/v1/fileupload/upload'
// 'https://carbon-dev-api.shinetrace.space/carbon/api/v1/fileupload/upload'

export const ImageUpload = (file, fileName) => {
  var formdata = new FormData()
  formdata.append('file', file, fileName)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  }

  return (
    fetch(FileUploadEndpoint, requestOptions)
      .then((response) => response.json())
      // .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  )
}
