import React from "react";

function LapDescComponent({LapNumber, Duration, StartTime}){
    return(
        <div className="Laps">
                <p>#{LapNumber}</p>
                <p>{Duration}</p>
                <p>{StartTime}</p>
        </div>
    );
}

export default LapDescComponent;