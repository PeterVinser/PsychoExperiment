import { final } from "../../constants/constants-final.js";
import "./final.css"

function Final() {
    return (
        <div>
            <h1>
                {final.header}
            </h1>
            <p className="ending">
                {final.explanation}
            </p>
            <p className="ending">
                {final.contact}
            </p>
        </div>
    );
}

export default Final;