let getInfo = (data) => {
    let formatted_address = data['results'][0]['formatted_address']
    let lat = data.results[0].geometry.location.lat
    let lng = data.results[0].geometry.location.lng
    return {
      formatted_address,
      lat,
      lng
    }
  }
  
module.exports = getInfo