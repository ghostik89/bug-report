import React from 'react'
import FileUploader from "../DragAndDrop/FileUploader";

export const Form = () => {
    return(
        <div className="card">
            <h1>This is my form</h1>
            <form className="form">
                <div>
                    <label htmlFor="form__email">Email:</label>
                    <input type="email" className="form" id="email-form"/>
                </div>
                <div>
                    <label htmlFor="form__comment">Comment:</label>
                    <input type="text" className="comment" id="comment-form"/>
                </div>
                <FileUploader/>
                <button type="submit" className="form__button">SEND</button>
            </form>
        </div>
    )
}