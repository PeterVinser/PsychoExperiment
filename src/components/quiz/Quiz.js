import { Component } from "react";
import { quiz } from "../../constants/constants-quiz";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.answers = [];

        this.index = props.location.state.index != null ? props.location.state.index : 0;

        this.timer = 0;
        this.questionStartTime = 0;
        this.totalTime = 90;

        this.state = {
            answered: false,
            problem: quiz.problems[this.index++],
            submitted: false,
            seconds: this.totalTime,
            music: props.location.state.music
        };

        this.participantId = props.location.state.participantId;

        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.onAnswerChange = this.onAnswerChange.bind(this);

        this.answerSubmit = this.answerSubmit.bind(this);
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
    
    onAnswerChange(answer) {
        this.setState({
            selectedOption: answer.target.value
        });

        this.setState({
            answered: true
        })
    }

    answerSubmit(e) {
        e.preventDefault();

        let startTime = this.questionStartTime;
        let endTime = this.totalTime - this.state.seconds;
        let time = endTime - startTime;
        this.questionStartTime = endTime;

        let answer = {
            id: this.state.problem.id,
            answer: this.state.selectedOption,
            time: time
        };

        this.answers.push({
            answer
        });

        this.index++;

        this.setState({
            problem: quiz.problems[this.index++]
        });

        this.setState({
            answered: false
        });

        this.setState({
            selectedOption: 'none'
        });
    }

    submitAnswers() {

        var data;
        var path;
        
        if(this.state.music) {
            data = {
                secondPart: this.answers
            };
            path = "/final";
        } else {
            data = {
                firstPart: this.answers
            };
            path = "/intermission";
        }

        console.log(data);

        updateDoc(doc(db, "participants", this.participantId), data)
        .then((doc) => {
            console.log(doc);
        });

        return (
            <Navigate to={path} state={{participantId: this.participantId, index: this.index}}/>
        );
    }

    showProblem(problem) {
        return (
            <div>
                {((this.state.submitted || this.state.seconds === 0)) && (
                    this.submitAnswers()
                )}
                <p>
                    {problem.content}
                </p>
                <p>
                    {problem.question}
                </p>
                <form onSubmit={this.answerSubmit}>
                    {problem.answers.map((answer) => (
                        <div key={answer.charAt(0)}>
                            <label>
                                <input 
                                    type="radio" 
                                    value={answer.charAt(0)}
                                    checked={this.state.selectedOption === answer.charAt(0)}
                                    onChange={this.onAnswerChange}/>
                                {answer}
                            </label>
                        </div>
                    ))}
                <div>
                    <button disabled={!this.state.answered} type="submit">
                        Dalej
                    </button>
                </div>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    Pozostały czas: {this.displayTime(this.state.seconds)}
                </div>
                <div>
                    {this.showProblem(this.state.problem)}
                </div>
            </div>
        );
    }
}

function QuizWithHook(Component) {
    return function WrappedComponent(props) {
        const location = useLocation();
        return <Component {...props} location={location}/>
    }
}

export default QuizWithHook(Quiz);