
import React, { Component } from 'react'

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
        console.log(resDays)
        this.setState({ activeDays: resDays });
    }
    render() {
        const { activeDays } = this.state;
        return (

            <div>
                <svg class="punch-card" width="392" height="196">
                    <g class="punch-card__xAxis">
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} textAnchor="middle" dy="12" dx="88">
                            M
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} textAnchor="middle" dy="12" dx="136">
                            T
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} textAnchor="middle" dy="12" dx="184">
                            W
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} textAnchor="middle" dy="12" dx="232">
                            T
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} textAnchor="middle" dy="12" dx="280">
                            F
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} text-anchor="middle" dy="12" dx="328">
                            S
                        </text>
                        <text className="relative font-extrabold text-gray-400 text-base" style={{ fill: 'gray' }} text-anchor="middle" dy="12" dx="376">
                            S
                        </text>
                    </g>

                    <g class="punch-card__data">
                        <g class="punch-card__data-row">
                            <g>
                                <circle cy="59" cx="88" style={{ fill: activeDays.includes('Mon') ? '#6ec3c7' : 'eee' }} r="16">
                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="136" style={{ fill: activeDays.includes('Tue') ? '#6ec3c7' : 'eee' }} r="16">
                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="184" style={{ fill: activeDays.includes('Wed') ? '#6ec3c7' : 'eee' }} r="16">
                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="232" style={{ fill: activeDays.includes('Thur') ? '#6ec3c7' : 'eee' }} r="16">

                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="280" style={{ fill: activeDays.includes('Fri') ? '#6ec3c7' : 'eee' }} r="16">
                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="328" style={{ fill: activeDays.includes('Sat') ? '#6ec3c7' : 'eee' }} r="16">
                                </circle>
                            </g>
                            <g>
                                <circle cy="59" cx="376" style={{ fill: activeDays.includes('Sun') ? '#6ec3c7' : 'eee' }} r="16">

                                </circle>
                            </g>
                        </g>

                    </g>
                </svg>
            </div>
        )
    }
}
