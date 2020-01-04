
# React Mapchart

!WIP: The aim of this react component library is to render mapcharts to canvas using a simple declarative api similar to [react-simple-maps](https://www.react-simple-maps.io/).

```jsx
import { CanvasMap, Geographies, Geography } from "react-mapchart"

const MyMap = () => {
  return (
    <CanvasMap width={800} height={600}>
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
        {({geographies, highlighted}) =>
          geographies.map(geo =>
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={highlighted === geo.rsmKey ? "#F53" : "#EEE"}
            />
          )
        }
      </Geographies>
    </CanvasMap>
  )
}
```
