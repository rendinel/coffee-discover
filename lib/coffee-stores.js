import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})
const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

const getListofCoffeeStoresPhoto = async () => {
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    perPage: 40,
  })
  const unsplashResults = photos.response.results

  return unsplashResults.map((result) => result.urls['small'])
}

export const fetchCoffeeStores = async (
  latLong = '43.64990206482973%2C-79.38448035304708',
  limit = '10'
) => {
  const photos = await getListofCoffeeStoresPhoto()
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  }

  const response = await fetch(
    getUrlForCoffeeStores(latLong, 'coffee', limit),
    options
  )
  const data = await response.json()
  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      imgUrl: photos.length > 0 ? photos[i] : null,
      address: result.location.address,
      name: result.name,
      neighborhood:
        result.location.neighborhood > 0 ? result.location.neighborhood[0] : '',
    }
  })
}

// 112
