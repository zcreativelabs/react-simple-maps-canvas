
import React, { Fragment, useContext, useRef, useEffect, useState } from "react"
import { feature } from "topojson-client"
import bbox from "@turf/bbox"
import booleanPointInPolygon from "@turf/boolean-point-in-polygon"
import Flatbush from "flatbush"

const Geographies = ({ geography, children }) => {
  const { mapRef, width, height, dpi, x, y, projection } = useContext(MapContext)
  const [geographies, setGeographies] = useState([])
  const [highlighted, setHighlighted] = useState(null)
  const indexRef = useRef()

  useEffect(() => {
    if (!indexRef.current) return
    const [x1, y1] = projection.invert([x, y])
    const idx = indexRef.current.neighbors(x1, y1, 5)

    if (!idx) return

    const candidates = idx.map(d => geographies[d])

    const isSelected = candidates.reduce((acc, cur) => {
      const isContained = booleanPointInPolygon({
        type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [x1, y1],
          },
      }, cur)
      return isContained ? cur.rsmKey : acc
    }, "")
    
    setHighlighted(isSelected)
  }, [x, y])

  useEffect(() => {
    fetch(geography)
      .then(res => res.json())
      .then(data => {
        const features = feature(data, data.objects[Object.keys(data.objects)[0]]).features
        const ctx = mapRef.current.getContext("2d")

        ctx.setTransform(dpi, 0, 0, dpi, 0, 0)
        ctx.clearRect(0, 0, width, height)

        const geos = features.map((d, i) => ({ ...d, rsmKey: `geo-${i}`, bbox: bbox(d) }))

        const index = new Flatbush(geos.length)
        geos.forEach(g => index.add(g.bbox[0], g.bbox[1], g.bbox[2], g.bbox[3]))
        index.finish()

        indexRef.current = index

        setGeographies(geos)
      })
  }, [])

  return geographies.length
    ? <Fragment>{children({geographies, highlighted})}</Fragment>
    : null
}

export default Geographies
