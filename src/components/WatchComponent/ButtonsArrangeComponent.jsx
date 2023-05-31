import React from "react";

function ButtonsArrangeComponent({childComponents}){
    return(
        <div className="Buttons-Container">
            {childComponents.map((ChildComponent, index) => (
                 ChildComponent
            ))}
        </div>
    );
}

export default ButtonsArrangeComponent;