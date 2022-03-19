const axios = require('axios');
const db = require('../model/databaseModel.js')

const apiController = {};

apiController.getResults = (req, res, next) => {
  // console.log(req);
  let wheelchairFlag = false;

  const radius = Math.round((req.body.radius || 5) * 1609.34);
  const location = (req.body.location || req.body.defaultLocation);
  const categories = (req.body.categories || []);


  let wheelchairSearch = '';
  

  for (let i = 0; i < req.body.accommodations.length; i++){
    if (req.body.accommodations[i] === "Wheelchair Accessibility"){
      wheelchairSearch = 'wheelchair_accessible';
      wheelchairFlag = true;
    }
  }
  axios({
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    // data: {},
    params: {
      'attributes' : wheelchairSearch,
      'radius': radius,
      'location': location,
      'categories': categories,
      'limit': 25,
    },
    headers: {
      // 'Content-Type': 'application/json',
      // 'Connection' : 'keep-alive',
      'Authorization' : 'Bearer 1PysHaJAnrIqGD2_UkmWb3FFg9k0NGkfmkax-OSXH7VYmfqrlnl-a9DwDln-W0iREATYTDDcJBwmCHz8EFnlL4vM3AO5S76hR5rmND6ywZt7m4yvw_uDpYYdE9n5YXYx',
    },
  })
  .then((response) => {
    res.locals.matches = response.data.businesses.map((business) => ({
        id: business.id,
        name : business.name,
        image : business.image_url,
        url : business.url,
        address : `${business.location.address1}, ${business.location.city}, ${business.location.state} ${business.location.zip_code}`,
        phone : `(${business.phone.slice(2, 5)}) ${business.phone.slice(5, 8)}-${business.phone.slice(8)}`,
        rating : business.rating,
        price : business.price,
        distance :`${Math.round(business.distance * .00062137 * 100) / 100} mi`
    }));
  })
  .then((response) =>{

    if (wheelchairFlag){
      for (let i = 0; i < res.locals.matches.length; i++){
        res.locals.matches[i].allAccommodations = [];
        res.locals.matches[i].allAccommodations[0] = 'Wheelchair Accessibility';
      }
    }
  })
  .then(() => {
    return next();
  })
  .catch((err) => next({
      log: `Error in getResults controller: ${err}`,
      message: { err: 'See log for error details'},
  }));
}

// 
//not tested
apiController.getAccommodationsForVenues = (req, res, next) => {
  try {
    multipleQuery();
  } catch {
    next({
      log: `apiController.getAccommodationsForVenues: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: {err: 'Error at apiController.getAccommodationsForVenues. Check server logs for details.'}
    });
  }

  async function multipleQuery() {
    for (let i = 0; i < res.locals.matches.length; i++){
    if (!res.locals.matches[i].hasOwnProperty('allAccommodations')){
      res.locals.matches[i].allAccommodations = [];
    }

    let venueId = res.locals.matches[i].id;
    let queryText = `
                      SELECT accommodation.accommodation FROM public.accommodation 
                      INNER JOIN venue_accommodation ON accommodation.accommodation=venue_accommodation.accommodation
                      INNER JOIN venue ON venue_accommodation."venueId"=venue."venueId"
                      WHERE venue."venueId"='${venueId}';
                    `
    await db.query(queryText)
    .then(result =>{
        console.log(result.rows)
        for (let j = 0; j < result.rows.length; j++){
          res.locals.matches[i].allAccommodations.push(result.rows[j].accommodation)
        }
        res.locals.matches[i].allAccommodations = [...new Set(res.locals.matches[i].allAccommodations)]
      })
      .catch(err => next({
        log: `apiController.multipleQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at apiController.multipleQuery. Check server logs for details.'}
    }));
  }
  return next();
  }


}

apiController.accommodationSearch = (req, res, next) => {

  const { accommodations } = req.body;
  res.locals.finalized = {};
  res.locals.finalized.perfectMatches = [];
  res.locals.finalized.partialMatches = [];
  res.locals.finalized.noMatch = [];

  for (let i = 0; i < res.locals.matches.length; i++){
    res.locals.matches[i].matchedAccommodations = [];
    for (let j = 0; j < accommodations.length; j++){
      for (let l = 0; l < res.locals.matches[i].allAccommodations.length; l++){
        if (accommodations[j] === res.locals.matches[i].allAccommodations[l]){
          res.locals.matches[i].matchedAccommodations.push(accommodations[j])
        }
      }
    }
    if (res.locals.matches[i].matchedAccommodations.length === accommodations.length){
      res.locals.finalized.perfectMatches.push(res.locals.matches[i]);
    } else if (res.locals.matches[i].matchedAccommodations.length > 0){
      res.locals.finalized.partialMatches.push(res.locals.matches[i]);
    } else {
      res.locals.finalized.noMatch.push(res.locals.matches[i]);
    }
  }

  res.locals.matches = {};
  return next();

}


apiController.addAccommodationToVenue = (req, res, next) => {

  const { accommodation, accomType, venueId, venueName } = req.body; 
  const venueNameSanitized = venueName.replaceAll("'", "''");
  let venueQuery = `SELECT * FROM venue WHERE "venueName" = '${venueNameSanitized}'`
  let accomQuery = `SELECT * FROM accommodation WHERE "accommodation" = '${accommodation[0]}'`
  let query = ``

  try {
    multQuery();
  } catch {
    next({
      log: `apiController.addAccommodationToVenue: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: {err: 'Error at apiController.addAccommodationToVenue. Check server logs for details.'}
    });
  }


  async function multQuery(){
    await db.query(venueQuery)
    .then(result => {
        if (result.rows[0] === undefined){
          query += `INSERT INTO venue ("venueId", "venueName") VALUES ('${venueId}', '${venueNameSanitized}'); `
          
        }
    })
    
    await db.query(accomQuery)
      .then(result => {
        if (result.rows[0] === undefined){
          query += `INSERT INTO accommodation ("accommodation", "accommodationType") VALUES ('${accommodation}', '${accomType}'); `
        }
    })
    
    for (let i = 0; i < accommodation.length; i++){
      
      let base = `INSERT INTO public.venue_accommodation (accommodation, "venueId") VALUES ('${accommodation[i]}', '${venueId}'); `
      query += base;
    }
      db.query(query)
        .then(result => {
          res.locals.valid = true;
          res.locals.accommodation = accommodation[0];
          return next()
        })
        .catch(err => next({
          log: `apiController.addAccomm: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
          message: {err: 'Error at apiController.addAccomm. Check server logs for details.'}
      }));

    }
  // let query = `INSERT INTO venue ("venueId", "venueName") VALUES ('${venueId}', '${venueName}');`
  }

// mobility, vision, hearing, other

  apiController.addNewAccommodation = (req, res, next) => {
    const { accName, accType } = req.body;
    let query = `INSERT INTO accommodation (accommodation, "accommodationType") VALUES ('${accName}', '${accType}')`
    db.query(query)
      .then(result => {
        res.locals.valid = true;
        return next()
      })
        .catch(err => next({
          log: `apiController.addNewAccomm: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
          message: {err: 'Error at apiController.addNewAccomm. Check server logs for details.'}
      }));
      
  }

  apiController.getAccommodations = (req, res, next) => {
    if (!res.locals.valid){
      console.log('getAccommodations: skipping accommodation query, invalid login')
      return next();
    }

    db.query('SELECT accommodation FROM accommodation;')
      .then(result => {
        const accomList = [];
        for (const elem of result.rows){
          accomList.push(elem.accommodation);
        }
        res.locals.accommodations = accomList;
        return next();
      })
      .catch(err => next({
        log: `apiController.getAccommodations: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
        message: {err: 'Error at apiController.getAccommodations. Check server logs for details.'}
    }));
  }

module.exports = apiController;