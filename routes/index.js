var express = require("express");
var router = express.Router();
const axios = require("axios");
var WordPOS = require('wordpos');
let wordpos = new WordPOS();


const result = async (place_id, max_words, sort_param) => {
  const key = "AIzaSyC2wX5xFwPhmQxChCoFD7kwxYaY9gN9NMc";
  // const { place_id, max_words, sort_param } = req.body;

  let photos = [];
  let rating = []
  try {
    if (!place_id) throw 'Error';
    const adArr = [];

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${key}`
    );
    data.result.reviews.forEach((review) => {
      let x = wordpos.getAdjectives(review.text, (result) => {
      });
      adArr.push(x)
    })

    let resp = await Promise.all(adArr);
    resp = [...new Set([].concat(...resp))]

    if (max_words) {
      resp = resp.splice(0, max_words * data.result.reviews.length);
    }
    if (sort_param === 'alpha') {
      resp = resp.sort()
    }

    rating = data.result.reviews.map((ratingObj) => ratingObj.rating);
    photos = data.result.photos.map((photoObj) => photoObj.photo_reference)

    res.status(200).send({ rating, photos, resp });
  } catch (err) {
    res.status(404).send(err);
  }
}  
await result('ChlJw2mPuVEP9YgRszkcSv4TPms', 2, 'alpha')


// router.post("/restaurants", async (req, res, next) => {
//   const key = "AIzaSyC2wX5xFwPhmQxChCoFD7kwxYaY9gN9NMc";
//   const { place_id, max_words, sort_param } = req.body;

//   let photos = [];
//   let rating = []
//   try {
//     if (!place_id) throw 'Error';
//     const adArr = [];

//     const { data } = await axios.get(
//       `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${key}`
//     );
//     data.result.reviews.forEach((review) => {
//       let x = wordpos.getAdjectives(review.text, (result) => {
//       });
//       adArr.push(x)
//     })

//     let resp = await Promise.all(adArr);
//     resp = [...new Set([].concat(...resp))]

//     if (max_words) {
//       resp = resp.splice(0, max_words * data.result.reviews.length);
//     }
//     if (sort_param === 'alpha') {
//       resp = resp.sort()
//     }

//     rating = data.result.reviews.map((ratingObj) => ratingObj.rating);
//     photos = data.result.photos.map((photoObj) => photoObj.photo_reference)

//     res.status(200).send({ rating, photos, resp });
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// module.exports = router;
