import React from 'react'
import * as SVG from 'react-native-svg'
import {ITabIconProps} from "../../types/interfaces";
const { Svg, Path } = SVG

const HomeIcon = ({ fill, size ,focused}:ITabIconProps) => (
    <Svg width={size} height={size} viewBox='0 0 24 24'>
        <Path
            d='M12.2607 4.7475C12.1909 4.68074 12.098 4.64348 12.0015 4.64348C11.9049 4.64348 11.812 4.68074 11.7422 4.7475L3.11255 12.9914C3.0759 13.0265 3.04674 13.0686 3.02684 13.1152C3.00694 13.1619 2.99671 13.2121 2.99677 13.2628L2.99536 21C2.99536 21.3978 3.1534 21.7794 3.4347 22.0607C3.71601 22.342 4.09754 22.5 4.49536 22.5H9.00005C9.19896 22.5 9.38973 22.421 9.53038 22.2803C9.67103 22.1397 9.75005 21.9489 9.75005 21.75V15.375C9.75005 15.2755 9.78956 15.1802 9.85988 15.1098C9.93021 15.0395 10.0256 15 10.125 15H13.875C13.9745 15 14.0699 15.0395 14.1402 15.1098C14.2105 15.1802 14.25 15.2755 14.25 15.375V21.75C14.25 21.9489 14.3291 22.1397 14.4697 22.2803C14.6104 22.421 14.8011 22.5 15 22.5H19.5029C19.9007 22.5 20.2822 22.342 20.5635 22.0607C20.8448 21.7794 21.0029 21.3978 21.0029 21V13.2628C21.0029 13.2121 20.9927 13.1619 20.9728 13.1152C20.9529 13.0686 20.9237 13.0265 20.8871 12.9914L12.2607 4.7475Z'
            fill={fill}
            stroke-width='1'
        />
        <Path
            d='M23.0114 11.4445L19.5052 8.09016V3C19.5052 2.80109 19.4262 2.61032 19.2855 2.46967C19.1449 2.32902 18.9541 2.25 18.7552 2.25H16.5052C16.3063 2.25 16.1155 2.32902 15.9748 2.46967C15.8342 2.61032 15.7552 2.80109 15.7552 3V4.5L13.0402 1.90406C12.7861 1.64719 12.4083 1.5 12 1.5C11.5931 1.5 11.2163 1.64719 10.9622 1.90453L0.991893 11.4436C0.70033 11.7248 0.663768 12.1875 0.92908 12.4922C0.995704 12.5691 1.07728 12.6316 1.16885 12.676C1.26041 12.7204 1.36005 12.7457 1.46169 12.7503C1.56334 12.755 1.66487 12.7389 1.7601 12.7031C1.85533 12.6672 1.94228 12.6124 2.01564 12.5419L11.7422 3.2475C11.812 3.18074 11.9048 3.14348 12.0014 3.14348C12.098 3.14348 12.1909 3.18074 12.2606 3.2475L21.9881 12.5419C22.1314 12.6793 22.3234 12.7543 22.5219 12.7504C22.7204 12.7465 22.9092 12.6641 23.047 12.5212C23.3349 12.2231 23.311 11.7309 23.0114 11.4445Z'
            fill={fill}
            stroke-width='1'
        />
    </Svg>
)
export default HomeIcon