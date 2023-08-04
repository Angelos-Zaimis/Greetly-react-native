import * as React from "react"
import Svg, { SvgProps, Circle, Rect } from "react-native-svg"
import '../onboarding/worldmap.png'
export const ZurichIcon = (props: SvgProps) => (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
      <Rect x="15" y="15" width="100" height="70" stroke="red" strokeWidth="2" fill="yellow" />
    </Svg>
)

