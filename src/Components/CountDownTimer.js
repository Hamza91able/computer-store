import React from 'react';
import moment from 'moment';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = { time: {}, seconds: 5000 };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let days = Math.floor(secs / (24 * 3600));
        let hours = Math.floor((secs % (24 * 3600)) / 3600);
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "d": days,
            "h": hours,
            "m": minutes,
            "s": seconds
        };

        return obj;
    }

    componentDidMount() {
        const { timeTillDate, timeFormat } = this.props;
        const then = moment(timeTillDate, timeFormat);
        const now = moment().format(timeFormat);
        const countdown = moment.duration(then.diff(now)).asSeconds();
        this.setState({
            seconds: countdown
        })
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        this.startTimer();
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.time.d}:{this.state.time.h}:{this.state.time.m}:{this.state.time.s}
            </React.Fragment>
        );
    }
}