const axios = require('axios');
const db = require('../model/databaseModel.js')

const apiController = {};

apiController.getResults = (req, res, next) => {
  // console.log(req);


  const radius = Math.round((req.body.radius || 5) * 1609.34);
  const location = (req.body.location || 10109);
  const categories = (req.body.categories || []);
  // console.log(categories);
  axios({
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search',
    // data: {},
    params: {
      'attributes' : 'wheelchair_accessible',
      'radius': radius,
      'location': location,
      'categories': categories,
    },
    headers: {
      // 'Content-Type': 'application/json',
      // 'Connection' : 'keep-alive',
      'Authorization' : 'Bearer 1PysHaJAnrIqGD2_UkmWb3FFg9k0NGkfmkax-OSXH7VYmfqrlnl-a9DwDln-W0iREATYTDDcJBwmCHz8EFnlL4vM3AO5S76hR5rmND6ywZt7m4yvw_uDpYYdE9n5YXYx',
    },
  })
  .then((response) => {
    res.locals = response.data.businesses.map((business) => ({
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
  .then(() => { next(); })
  .catch((err) => next({
      log: `Error in getResults controller: ${err}`,
      message: { err: 'See log for error details'},
  }));
}

//not tested
apiController.getAccommodationsForVenues = (req, res, next) => {

  //skip querying for accomms if none were requested
  if (!req.body.accommodations){
    return next();
  }

  const { accommodations } = req.body;

  try {
    console.log('trying to query accoms')
    multipleQuery();
  } catch {
    next({
      log: `apiController.getAccommodationsForVenues: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: {err: 'Error at apiController.getAccommodationsForVenues. Check server logs for details.'}
    });
  }

  async function multipleQuery() {
    for (let i = 0; i < res.locals.length; i++){
    let venueId = res.locals[i].id;
    let queryText = `
                      SELECT * FROM accommodation 
                      INNER JOIN venue_accommodation ON accommodation.accommodation=venue_accommodation.accommodation
                      INNER JOIN venue ON venue_accommodation."venueId"=venue."venueId"
                      WHERE venue."venueId"='${venueId}';
                    `
    let query = 
        {
        text: queryText,
        values: [venueId]
        }

    await db.query(query.text, query.values)
    .then(result =>{
      console.log('found this result')
      console.log(result.rows)

    })
    .catch(err => next({
      log: `apiController.multipleQuery: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: {err: 'Error at apiController.multipleQuery. Check server logs for details.'}
  }));
    
  }
  return next();
  }


}

apiController.addAccommodationToVenue = (req, res, next) => {
  const { accommodation, venueId, venueName } = req.body; 
  let venueQuery = `SELECT * FROM venue WHERE "venueName" = '${venueName}'`
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
          query += `INSERT INTO venue ("venueId", "venueName") VALUES ('${venueId}', '${venueName}'); `
          
        }
    })
    
    for (let i = 0; i < accommodation.length; i++){
      let base = `INSERT INTO public.venue_accommodation (accommodation, "venueId") VALUES ('${accommodation[i]}', '${venueId}'); `
      query += base;
    }
      db.query(query)
        .then(result => {
          res.locals.valid = true;
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
/*
  POST /ACC
  req.body { accName: string, accType: string }
  response { valid: boolean }

/*

// example: INSERT INTO public.user (username, password, "displayName", "defaultLocation", "sessionId", "sessionExpiration") VALUES ($1, $2, $3, $4, $5, $6);`
//click boxes, only avail accomms are those in DB
//based on submit
//vanue into venue table ??? 
//venue_accomm table

/*
 
  INSERT INTO venue_accommodation (venueId, accommodation) VALUES (...);
  INSERT INTO venue (venueId, venuName)...displayName


*/


// POST /api/add
//   req.body { accomodations: [strings], venueId: string, venueName: string }
//   response = { valid: boolean }


module.exports = apiController;