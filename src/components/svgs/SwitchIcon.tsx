import React from 'react'
import * as SVG from 'react-native-svg'
import {IIconProps} from "../../types/interfaces";

const { Svg, Path } = SVG

function SwitchIcon({fill,size}:IIconProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox='0 0 18 20'
            fill='none'
        >
            <Path
                d='M11.707 1.712l-4 4L4.419 9l1.29 1.29a1 1 0 0 1 .21 1.09A.987.987 0 0 1 5 12H1a1 1 0 0 1-1-1V7a.987.987 0 0 1 .62-.92 1 1 0 0 1 1.09.21L3 7.581l3.289-3.289 4-4a1.003 1.003 0 0 1 1.418 1.42zM6.293 16.288l4-4L13.581 9l-1.29-1.29a1 1 0 0 1-.21-1.09A.987.987 0 0 1 13 6h4a1 1 0 0 1 1 1v4a.987.987 0 0 1-.62.92 1 1 0 0 1-1.09-.21L15 10.419l-3.289 3.289-4 4a1.003 1.003 0 0 1-1.418-1.42z'
                stroke={fill}
                strokeWidth='1.8'
            />
        </Svg>
    )
}

export default SwitchIcon
