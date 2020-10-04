import React, { createRef, Component } from "react";
import * as d3 from "d3";
const colors = (index) => {
    if (index === 0)
        return "#6ec3c7"
    else
        return "#eee";
}
class PieChart extends Component {
    constructor(props) {
        super(props);

        this.ref = createRef();
        this.createPie = d3
            .pie()
            .value((d) => d.value)
            .sort(null);
        this.createArc = d3
            .arc()
            .innerRadius(props.innerRadius)
            .outerRadius(props.outerRadius);
    }
    componentDidMount() {
        const num = (this.props.data[0].value / (this.props.data[0].value + this.props.data[1].value)) * 100 || 0;
        const svg = d3.select(this.ref.current);
        const data = this.createPie(this.props.data);
        const { width, height, outerRadius } = this.props;
        //<text x="100" y="124" font-family="sans-serif" font-size="32px" font-weight="700" fill="gray">25%</text>
        svg.attr("class", "chart").attr("width", width).attr("height", height);
        svg.append("text")
            .attr("x", "100")
            .attr("y", "128")
            .attr("font-size", "32px")
            .attr("font-weight", "700")
            .attr("fill", "gray")
            .text(num + "%");
        const group = svg
            .append("g")
            .attr("transform", `translate(${outerRadius} ${outerRadius})`);

        const groupWithEnter = group.selectAll("g.arc").data(data).enter();

        const path = groupWithEnter.append("g").attr("class", "arc");

        path
            .append("path")
            .attr("stroke-linecap", "round")
            .attr("class", "arc")
            .attr("d", this.createArc)
            .attr("fill", (d, i) => colors(d.index));


    }

    render() {
        return <svg ref={this.ref} />;
    }
}

export default PieChart;
