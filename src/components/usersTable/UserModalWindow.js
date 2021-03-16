import React from 'react';
import './UserModalWindow.css'

const UserModalWindow = ({active, children}) => {
    return(
        <div className={active ? "modal active" : "modal"} >
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default UserModalWindow;
