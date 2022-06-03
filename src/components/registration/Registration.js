import React from "react";
import { registration } from "../../constants/constants-registration";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./registration.css";

function Registration() {
    const [checked, setChecked] = React.useState(false);

    const navigate = useNavigate();

    function handleChange() {
        setChecked(!checked)
    }

    function register() {

        const tempo = [80, 120, 180][Math.floor(Math.random() * 3)];

        addDoc(collection(db, "participants"), {tempo: tempo})
        .then((nameDoc) => {
            navigate('/quiz', {state: {music: false, participantId: nameDoc.id, tempo: tempo}});
        });
    }

    return (
        <div className="container">
            <div className="content">
                <h1>
                    {registration.title}
                </h1>
                <div>
                    <div className="description" style={{whitespace: 'pre-line'}}>
                        {registration.descriptionParagraphs.map((paragraph) => (
                            <p>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
                <div className="form">
                    <p className="question">
                        {registration.question}
                    </p>
                    <div>
                        <label>
                            Tak
                            <input
                                type="radio"
                                checked={checked}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Nie
                            <input
                                type="radio"
                                checked={!checked}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button className="button" disabled={!checked} onClick={register}>
                            Rozwiąż test
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;