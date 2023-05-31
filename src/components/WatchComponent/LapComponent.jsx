import React from "react";

function LapComponent({childComponents}){

    return(
        <div className="Lap-Container">
            {childComponents.map((ChildComponent, index) => (
                 ChildComponent
            ))}
        </div>
    );
}

export default LapComponent;