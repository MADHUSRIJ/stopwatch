import React from "react";
import '../../App.css'

function MobileComponent({ChildComponent}){
    return(
        <div className="Mobile-Div">
            <ChildComponent />
        </div>
    );
};

export default MobileComponent;