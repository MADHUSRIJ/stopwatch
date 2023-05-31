import React from "react";

function IndicatorComponent({Duration, Timer}) {
    return(
        <div className="Indicator-Container">
            <div className="Duration-Text">{Duration}</div>
            <div className="Timer-Text">{Timer}</div>
        </div>
    );

}

export default IndicatorComponent;