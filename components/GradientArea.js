import React from 'react';
import { Area } from 'victory-native';
 import { LinearGradient, Stop } from 'react-native-svg';

// This customized component is supplied to VictoryArea
export default class GradientArea extends Area {

      toGrayscale(color) {
      const integerColor = parseInt(color.replace("#", ""), 16);
      const r = (integerColor >> 16) & 255;
      const g = (integerColor >> 8) & 255;
      const b = integerColor & 255;
      const gray = parseInt(0.299 * r + 0.587 * g + 0.114 * b, 10);
      return `rgb(${gray}, ${gray}, ${gray})`;
  }

  // This method exists in Area, and is completely overridden for the custom component.
renderArea(paths, style, events) {
    const gradientId = `gradient-${Math.random()}`;
    const areaStyle = Object.assign(
      {}, style, {fill: `url(lol#${gradientId})`}
    );
    const percent = `${this.props.percent}%`;
    const gray = this.toGrayscale(style.fill)
    console.log(paths);
    return paths.map((path, index) => {
      return (
        <g key={index}>
          <defs>
            <linearGradient id={gradientId}>
                <stop offset="0%" stopColor={style.fill}/>
                <stop offset={1} stopColor={style.fill}/>
                <stop offset={100} stopColor={gray}/>
                <stop offset="100%" stopColor={gray}/>
            </linearGradient>
          </defs>
          <path key="area" style={areaStyle} d={path} {...events}/>
        </g>
      );
    });
  }
}