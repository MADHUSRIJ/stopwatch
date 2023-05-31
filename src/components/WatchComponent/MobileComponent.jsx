import React from "react";
import '../../App.css'

function MobileComponent({childComponents}){
    return(
        <div className="Mobile-Container">
           {childComponents.map((ChildComponent, index) => (
                 ChildComponent
            ))}
        </div>
    );
};

export default MobileComponent;