const MAPBOX_PUBLIC_TOKEN =
  'pk.eyJ1IjoicGFzdHVkYW4iLCJhIjoiY2pybDR2eWNyMDR0cTN5dDJocTJ0bWltbCJ9.YFUKFpu2vkax0Yi-gcmDyw'

module.exports = function(history) {
  const geoJSONOrig = encodeURIComponent(
    JSON.stringify({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [history]
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: history[0]
          }
        }
      ]
    })
  )

  const geoJSON = encodeURIComponent(
    JSON.stringify({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [-41.30859375, 36.31512514748051],
              [-38.3203125, 8.928487062665504],
              [-27.94921875, -13.410994034321702],
              [-10.1953125, -17.476432197195518],
              [25.13671875, -21.453068633086772],
              [40.42968749999999, -25.95804467331783],
              [44.82421875, -32.54681317351514],
              [48.515625, -32.69486597787506]
            ]
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [52.91015625, -31.653381399663985]
          }
        }
      ]
    })
  )

  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="refresh" content="3">
            <meta charset="UTF-8">
            <title>Space Station Tracker</title>
        </head>

        <body>
            <h1>Space Station Tracker</h1>
            <img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/geojson(${geoJSON})/1,1,1,0,0/1280x720?access_token=${MAPBOX_PUBLIC_TOKEN}">
        </body>

    </html>
  `
}
