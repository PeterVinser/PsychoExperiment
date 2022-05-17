import { Component } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

class Intermission extends Component {
    constructor(props) {
        super(props);
        this.timer = 0;
        this.totalTime = 30;
        this.state = {
            seconds: this.totalTime
        };

        this.participantId = props.location.state.participantId;
        this.index = props.location.state.index;

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds
        });

        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }

    displayTime(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds/60);
        let seconds = timeInSeconds % 60;

        if (minutes > 0) {
            return `${minutes} min ${seconds} s`;
        }
        return `${seconds} s`;
    }

    render() {
        return(
            <div>
                {this.state.seconds === 0 && (
                    <Navigate to="/quiz" state={{music: true, participantId: this.participantId, index: this.index}}/>
                )}
                <p>
                    Pierwsza część badania minęła, za {this.displayTime(this.totalTime)} zapraszamy na część drugą
                </p>
                <p>
                    Częśc druga wymaga słuchania muzyki. Upewnij się, że masz podłączone głośniki
                </p>
                <p>
                    Czas: {this.displayTime(this.state.seconds)}
                </p>
            </div>
        );
    }
}

function IntermissionWithHook(Component) {
    return function WrappedComponent(props) {
        const location = useLocation();
        return <Component {...props} location={location}/>
    }
}


export default IntermissionWithHook(Intermission);