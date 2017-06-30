// This customized component is supplied to VictoryArea
class GradientArea extends Area {
  toGrayscale(color) {
      const integerColor = parseInt(color.replace("#", ""), 16);
      const r = (integerColor >> 16) & 255;
      const g = (integerColor >> 8) & 255;
      const b = integerColor & 255;
      const gray = parseInt(0.299 * r + 0.587 * g + 0.114 * b, 10);
      return `rgb(${gray}, ${gray}, ${gray})`;
  }

  // This method exists in Area, and is completely overridden for the custom component.
  renderArea(path, style, events) {
    const gradientId = `gradient-${Math.random()}`;
    const areaStyle = Object.assign(
      {}, style, {fill: `url(${location.href}#${gradientId})`}
    );
    const percent = `${this.props.percent}%`;
    const gray = this.toGrayscale(style.fill)
    return (
      <g>
        <defs>
          <linearGradient id={gradientId}>
              <stop offset="0%" stopColor={style.fill}/>
              <stop offset={percent} stopColor={style.fill}/>
              <stop offset={percent} stopColor={gray}/>
              <stop offset="100%" stopColor={gray}/>
          </linearGradient>
        </defs>
        <path key="area" style={areaStyle} d={path} {...events}/>
      </g>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { percent: 64 };
  }

  getStreamData() {
    return range(7).map((i) => {
      return range(26).map((j) => {
        return {
          _x: j,
          _y1: (10 - i) * random(10 - i, 20 - 2 * i),
          _y0: -1 * (10 - i) * random(10 - i, 20 - 2 * i)
        };
      });
    });
  }

  render() {
    const streamData = this.getStreamData();

    const colors = [
      "#006064", "#00796B", "#8BC34A", "#DCE775",
      "#FFF59D", "#F4511E", "#c33409"
    ];

    return (
      <VictoryChart
        domain={{x: [0, 25], y: [-300, 300]}}
      >
        <VictoryAxis
          style={{
            axis: {stroke: "none"},
            tickLabels: {fill: "none"},
            grid: {stroke: "gray"}
          }}
          tickCount={10}
        />
        <VictoryAxis dependentAxis
          style={{tickLabels: {fontSize: 15}}}
          crossAxis={false}
        />

        {
          streamData.map((d, i) => {
            return (
              <VictoryArea key={i}
                interpolation="monotoneX"
                data={d}
                style={{data: {fill: colors[i]}}}
                dataComponent={
                  <GradientArea percent={this.state.percent}/>
                }
              />
            );
          })
        }
        <VictoryLine
          style={{
            data: {stroke: "#c33409", strokeWidth: 3}
          }}
          data={[
            {x: 25 * this.state.percent / 100, y: -300},
            {x: 25 * this.state.percent / 100, y: 300}
          ]}
        />
      </VictoryChart>
    );
  }
}

ReactDOM.render(<App/>, mountNode)