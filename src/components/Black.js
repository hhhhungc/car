import React from "react";

function Black(props) {
    const { modal, handleModal } = props;
    return (
        <>{modal && <div className="black" onClick={handleModal}></div>}</>
    );
}

export default Black;
