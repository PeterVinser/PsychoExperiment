import React from "react";
import { registration } from "../../constants/constants-registration";
import { Link } from "react-router-dom";

function Registration() {
    const [checked, setChecked] = React.useState(false);

    function handleChange() {
        setChecked(!checked)
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
                <Link to="/quiz">
                    <button disabled={!checked} render>
                        Rozwiąż test
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Registration;