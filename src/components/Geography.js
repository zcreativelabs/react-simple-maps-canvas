
import { useContext, useEffect } from "react"

const Geography = ({ geography, fill }) => {
  const { path, dpi, mapRef } = useContext(MapContext)

  useEffect(() => {
    const ctx = mapRef.current.getContext("2d")
    ctx.setTransform(dpi, 0, 0, dpi, 0, 0)
    ctx.beginPath()
    ctx.strokeStyle = "#999"
    ctx.fillStyle = fill
    path.context(ctx)(geography)
    ctx.stroke()
    ctx.fill()
  }, [fill])

  return null
}

export default Geography
