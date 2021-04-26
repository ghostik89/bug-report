import React, {FormEvent} from 'react'
import FileUploader from "../DragAndDrop/FileUploader";
import './form.sass'

export const Form = () => {
    const handleSubmit = (event:FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
    }
    return(
        <div className="card">
            <div>
                <h1>This is my form</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        <span>Email:</span>
                        <input
                            type="email"
                            className={`form`}
                            name={"email"}
                            id="email-form"
                            placeholder="Email"
                        />
                    </label>
                    <label>
                        <span>Comment:</span>
                        <input
                            type="text"
                            className={`comment`}
                            id="comment-form"
                            placeholder="Comment"
                        />
                    </label>
                    <FileUploader/>
                    <button type="submit" className="form__button">SEND</button>
                </form>
            </div>
        </div>
    )
}