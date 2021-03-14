import React from 'react';
import './UserModalWindow.css'

const UserModalWindow = ({active, setActive, children}) => {
    return(
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default UserModalWindow;
