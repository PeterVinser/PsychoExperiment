import { quiz } from "../../constants/constants-quiz";

function Quiz() {
    return (
        <div>
            <p>Quiz</p>
            <div>
                {quiz.problems.map((problem) => (
                    <div>
                        <p>
                            {problem.content}
                        </p>
                        <p>
                            {problem.question}
                        </p>
                        {problem.answers.map((answer) => (
                            <div>
                                {answer}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Quiz;