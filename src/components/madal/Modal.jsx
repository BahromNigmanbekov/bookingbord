import React from 'react'
import "./modal.css"
function Modal({isOpen , setIsOpen , children}) {
  return (
    <>
      {isOpen ? (
        <div className="modal">
            <div className="colseDiv">
                <button onClick={()=> setIsOpen(false)} className='close'>close</button>
            </div>
            {children}
        </div>
      ) : (
        <></>
      )}
      {isOpen ? (
        <div className="overlay " onClick={()=> setIsOpen(false)}></div>
      ) : (
        <></>
      )}
    </>
  )
}

export default Modal
