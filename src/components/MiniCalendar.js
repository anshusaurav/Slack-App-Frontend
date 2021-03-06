
import React, { Component } from 'react'
const dayArr = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export default class MiniCalendar extends Component {
    state = {
        activeDays: []
    }
    componentDidMount() {
        const tokens = this.props.cron_text.split(' ');
        const dayTokens = tokens[4].split(',').map(elem => +elem);
        dayTokens.sort((a, b) => a - b);
        const week = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        let resDays = week.filter((day, index) => dayTokens.includes(index));//dayTokens.map(day=> week[day]);//week.filter((day, index) => dayTokens.includes(index));
        this.setState({ activeDays: resDays });
    }
    render() {
        const { activeDays } = this.state;
        return (
            <svg className="punch-card" width="392" height="196">
                <g className="punch-card__xAxis">
                    {
                        dayArr.map((day, index) => (
                            <text className="relative font-extrabold text-gray-400 text-base"
                                key={index}
                                style={{ fill: 'gray' }}
                                textAnchor="middle" dy="12" dx={88 + 48 * index}>
                                {day}
                            </text>
                        ))
                    }

                </g>

                <g className="punch-card__data">
                    <g className="punch-card__data-row">
                        <g>
                            <circle cy="59" cx="88" style={{ fill: activeDays.includes('Mon') ? '#4299e1' : 'eee' }} r="16">
                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="136" style={{ fill: activeDays.includes('Tue') ? '#4299e1' : 'eee' }} r="16">
                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="184" style={{ fill: activeDays.includes('Wed') ? '#4299e1' : 'eee' }} r="16">
                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="232" style={{ fill: activeDays.includes('Thur') ? '#4299e1' : 'eee' }} r="16">

                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="280" style={{ fill: activeDays.includes('Fri') ? '#4299e1' : 'eee' }} r="16">
                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="328" style={{ fill: activeDays.includes('Sat') ? '#4299e1' : 'eee' }} r="16">
                            </circle>
                        </g>
                        <g>
                            <circle cy="59" cx="376" style={{ fill: activeDays.includes('Sun') ? '#4299e1' : 'eee' }} r="16">

                            </circle>
                        </g>
                    </g>

                </g>
            </svg>
        )
    }
}
