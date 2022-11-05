import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };
  

  const handleclick = (e)=>{
    console.log("Updated Note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success")
}

const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
}

const[note, setNote] = useState({id:"",etitle:"", edescription:"", etag:"Default"})

  
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </button>
            </div>
            <div className="modal-body">
            <form>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">
            Title :-
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name= "etitle"
            aria-describedby="emailHelp" value={note.etitle} onChange = {onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description :-
          </label>
          <input
            type="text"
            className="form-control"
            name="edescription"
            id="edescription"  value= {note.edescription} onChange = {onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            tag :-
          </label>
          <input
            type="text"
            className="form-control"
            name="etag"
            id="etag" value= {note.etag} onChange = {onChange} />
        </div>
      </form>
            </div>
            <div className="modal-footer">
              <button
              ref= {refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" disabled ={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleclick}>
                Update changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
      <h1>Show your Notes</h1>
        <div className="container">
        {notes.length ===0 && 'No notes to display'}
        </div>
        {Array.isArray(notes)?notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote= {updateNote} note={note} showAlert={props.showAlert}/>
          );
        }): null}
      </div>
    </>
  );
};

export default Notes;