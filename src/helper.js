export default function getImageUrl(img_name) {
  try{
    return require('./images/' + img_name);
  }
  catch(err){
    console.log('img not found');
    return require('./fake_img.png');
  }
}
