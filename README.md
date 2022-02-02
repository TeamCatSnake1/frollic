Frollic

An app for finding accessible venues

POST /authentication
  req.body = { username: string, password: string, displayName: string, location: string(zipcode) }
  response = if false { valid: false, reason: string }
  response = if true { valid: true, username: string, displayName: string, accommodations: array, venues: array }

GET /authentication
  req.body = { username: string, password: string }
  response = if false { valid: false }
  response = if true { valid: true, username: string, displayName: string, accommodations: array, venues: array } // accommodations and venues are stretch goals

POST /api/search
  req.body = { accomodations: [strings], location: string(zipcode), radius: string, categories: string(businesstype1,businesstype2,businesstype3) }
  response = [ { accommodationsShaved: boolean, venueId: string, accommodations: [string, ...], address: string, distance: string, image: string, name: string, phone: string, price: string, rating: string, url: string }, {...}, ... ]

POST /api/add
  req.body { accomodations: [strings], venueId: string }
  response = { valid: boolean }

//stretch(?)
POST /user/accommodation
  req.body { username: string, accomodations: [string, ...] } // Delete old
  response = { valid: boolean, accomodations: [string, ...] }