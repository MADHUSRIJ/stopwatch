import React from "react";

function ButtonComponent({Style, ButtonIcon, ButtonId, OnClickEvent}){
    return(
        <div className="Button" style={Style} id={ButtonId} onClick={OnClickEvent}>
            <img src={ButtonIcon} alt="icon"/>
        </div>
    );
}

export default ButtonComponent;