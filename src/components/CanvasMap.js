
import React, { useRef, useState } from "react"
import { geoPath, geoEqualEarth } from "d3-geo"
import useMeasure from "react-use-measure"

import MapContext from "./MapContext"

const CanvasMap = ({ width = 800, height = 600, children }) => {
  const [xy, setxy] = useState([0, 0])
  const [ref, bounds] = useMeasure()
  const cref = useRef()
  const dpi = 2

  const projection = geoEqualEarth()
    .translate([width/2, height/2])
  
  const path = geoPath().projection(projection)

  return (
    <MapContext.Provider
      value={{
        mapRef: cref,
        projection,
        path,
        width,
        height,
        dpi,
        x: xy[0] - bounds.left,
        y: xy[1] - bounds.top,
      }}
    >
      <div
        ref={ref}
        style={{ width, height }}
        onMouseMove={({ clientX, clientY }) => setxy([clientX, clientY])}
      >
        <canvas
          ref={cref}
          width={width * dpi}
          height={height * dpi}
          style={{ width, height }}
        />
        {children}
      </div>
    </MapContext.Provider>
  )
}

export default CanvasMap
