import React from "react";
import { registration } from "../../constants/constants-registration";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

function Registration() {
    const [checked, setChecked] = React.useState(false);

    const navigate = useNavigate();

    function handleChange() {
        setChecked(!checked)
    }

    function register() {

        addDoc(collection(db, "participants"), {tempo: 100})
        .then((nameDoc) => {
            navigate('/quiz', {state: {music: false, participantId: nameDoc.id}});
        });
    }

    return (
        <div>
            <h1>
                {registration.title}
            </h1>
            <div>
                <p>{registration.question}</p>
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
                <button disabled={!checked} onClick={register}>
                        Rozwiąż test
                </button>
            </div>
        </div>
    );
}

export default Registration;