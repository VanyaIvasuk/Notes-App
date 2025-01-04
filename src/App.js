import "./App.css";
import Editor from "./components/Editor";
import FullNote from "./components/FullNote";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import PopupNoteInfoFill from "./components/PopupNoteInfoFill";
import SearchingNote from "./components/SearchingNote";
import Autorization from "./components/Autorization";
import SignAutorazationMenu from "./components/SignAutorazationMenu";
import { Routes, Route } from "react-router-dom";
import FirsHomePage from "./components/FirsHomePage";
import { CrossIcon } from "./icons";
import { useUserContext } from "./context/UserContext";
import {get, ref, set} from "firebase/database"
import { database } from "./firebase";
import useFetch from "./useFetch";
import LoaderAnim from "./images/LoaderAnim";

function App() {
  let [arrayOfNotes, setArrayOfNotes] = useState([]);
  let [arrayOfNoteFromFB, setArrayOfNoteFromFB] = useState([])
  let [isEditorOpened, setIsEditorOpened] = useState(false);
  let [choosedNoteTitle, setChoosedNoteTitle] = useState("");
  let [choosedNoteDescription, setChoosedNoteDescription] = useState("");
  let [
    isBtnForRedirectionToEditorClicked,
    setIsBtnForRedirectionToEditorClicked
  ] = useState(false);
  let [
    isBtnForRedirectionToFullNoteClicked,
    setIsBtnForRedirectionToFullNoteClicked,
  ] = useState(false);
  let [originalChoosedNoteTitle, setOriginalChoosedNoteTitle] = useState();
  let [originalChoosedNoteDescription, setOriginalChoosedNoteDescription] =
    useState();
  let [noteClickId, setNoteClickId] = useState(0);
  let [isNoteInfoFill, setIsNoteInfoFill] = useState(false);
  let [choosedCategory, setChoosedCategory] = useState("");
  let [isBtnForSearchNoteClicked, setIsBtnForSearchNoteClicked] =
    useState(false);
  let [isLogin, setIsLogin] = useState(false);
  let [isLoginFinished, setIsLoginFinished] = useState(true)
  let [textIntoWorryPopup, setTextIntoWorryPopup] = useState("")
  let [choosedNoteBgColor, setChoosedNoteBgColor] = useState("")
  let [choosedNoteIsDone, setChoosedNoteIsDone] = useState("")

  let {isLoading, fetchNotesHandler  } = useFetch();
  const converRecievedData = (data) => {
    let newNotes = [];
    for (const key in data) {
      newNotes.push({
        ...data[key],
        id: key,
      });
    }

    return newNotes;
  };
  
  const fetchNotes =  () => {
     fetchNotesHandler(
        {
            method:"GET",
        },
        (data) => {
          const transformedNotes = converRecievedData(data)
            setArrayOfNoteFromFB(transformedNotes);
        }
    );

};
useEffect(() => {
  fetchNotes();
}, [])

const createOptions = (method, body, id) => {
  return {
    id: id || "",
    method: method,
    headers: { "Content-type": "application/json" },
    body: body ? body : null,
  };
};


const postNotes =  (newNote) => {
     fetchNotesHandler(
        {
          ...createOptions("POST", newNote)
        },
        (data) => {

            const transformedNotes = Object.keys(data || {}).map((key) => ({
                id: key,
                ...data[key],
            }));

            setArrayOfNoteFromFB(transformedNotes);
        }
    );

};


const deleteNotes =  (noteId) => {
  fetchNotesHandler(
     {
      ...createOptions("DELETE", null, noteId)
     },
     (data) => {
    
         const transformedNotes = Object.keys(data || {}).map((key) => ({
             id: key,
             ...data[key],
         }));
       
         setArrayOfNoteFromFB(transformedNotes);
     }
 );

};

const putNote =  (noteId, newNote) => {
  fetchNotesHandler(
     {
      ...createOptions("PUT", newNote, noteId)
     },
     (data) => {
     
         const transformedNotes = Object.keys(data || {}).map((key) => ({
             id: key,
             ...data[key],
         }));
      
         setArrayOfNoteFromFB(transformedNotes);
     }
 );

}; 




  



  function updateNotes(newNote) {
    setArrayOfNotes([newNote, ...arrayOfNotes]);
    localStorage.setItem(
      "arrayOfNotes",
      JSON.stringify([newNote, ...arrayOfNotes])
    );
    setIsEditorOpened((isEditorOpened = false));
  }
  function openFullNoteHandler(title, description) {
    setIsBtnForRedirectionToFullNoteClicked(true);
    setChoosedNoteTitle((choosedNoteTitle = title));
    setChoosedNoteDescription((choosedNoteDescription = description));
  }

  function redirectionFromFullNoteToEditor() {
    setOriginalChoosedNoteTitle((originalChoosedNoteTitle = choosedNoteTitle));
    setOriginalChoosedNoteDescription(
      (originalChoosedNoteDescription = choosedNoteDescription)
    );
    setIsEditorOpened((isEditorOpened = true));
    setIsBtnForRedirectionToEditorClicked(
      (isBtnForRedirectionToEditorClicked = true)
    );
    setIsBtnForRedirectionToFullNoteClicked(
      (isBtnForRedirectionToFullNoteClicked = false)
    );
  }

  function changedButtonHandler(title, description) {
    setChoosedNoteTitle(title);
    setChoosedNoteDescription(description);
    setOriginalChoosedNoteTitle(title);
    setOriginalChoosedNoteDescription(description);
    setIsEditorOpened(true);
    setIsBtnForRedirectionToEditorClicked(true);
  }
  function changeChoosedNoteHandler() {
    let newNote = {
      title: choosedNoteTitle,
      description: choosedNoteDescription,
      id: noteClickId,
      bgColor: choosedNoteBgColor,
      translateY:0,
      isDone: choosedNoteIsDone
    }
    putNote(noteClickId, newNote)
    const arrayOfNotes = JSON.parse(localStorage.getItem("arrayOfNotes")) || [];
    const foundNote = arrayOfNotes.find(
      (note) => note.title === originalChoosedNoteTitle
    );
    if (foundNote) {
      foundNote.title = choosedNoteTitle;
      foundNote.description = choosedNoteDescription;
      localStorage.setItem("arrayOfNotes", JSON.stringify(arrayOfNotes));
      setArrayOfNotes([...arrayOfNotes]);
    }
    setIsBtnForRedirectionToEditorClicked(false);
    setIsEditorOpened(false);
  }
  function delateNoteFromArrayHandler(id) {
    const arrayOfNotes = JSON.parse(localStorage.getItem("arrayOfNotes")) || [];
    const updatedNotes = arrayOfNotes.filter((note) => note.id !== id);
    localStorage.setItem("arrayOfNotes", JSON.stringify(updatedNotes));
    setArrayOfNotes(updatedNotes);
  }

  return (
     <>
        <div className="App bg-[#252525] dark:bg-[#EDECE7] " onClick={() => {isNoteInfoFill && setIsNoteInfoFill(false) }}>
        {
          isLoading ?
            <LoaderAnim/>
          :
          isLoginFinished ?
             isBtnForSearchNoteClicked ?
             <SearchingNote
               setIsBtnForSearchNoteClicked={setIsBtnForSearchNoteClicked}
               isBtnForSearchNoteClicked={isBtnForSearchNoteClicked}
               arrayOfNotes={arrayOfNotes}
               choosedCategory={choosedCategory}
               changedButtonHandler={changedButtonHandler}
               redirectionFromFullNoteToEditor={redirectionFromFullNoteToEditor}
               delateNoteFromArrayHandler={delateNoteFromArrayHandler}
               noteClickId={noteClickId}
               setNoteClickId={setNoteClickId}
               openFullNoteHandler={openFullNoteHandler}
             />
             :
             isBtnForRedirectionToFullNoteClicked ? (
               <FullNote
                 redirectionFromFullNoteToEditor={redirectionFromFullNoteToEditor}
                 choosedNoteDescription={choosedNoteDescription}
                 choosedNoteTitle={choosedNoteTitle}
                 setIsBtnForRedirectionToFullNoteClicked={setIsBtnForRedirectionToFullNoteClicked}
               />
             ) : isEditorOpened ? (
               <Editor
               originalChoosedNoteDescription={originalChoosedNoteDescription}
               choosedNoteIsDone={choosedNoteIsDone}
               choosedNoteBgColor={choosedNoteBgColor}
               noteClickId={noteClickId}
               putNote={putNote}
               postNotes={postNotes}
                 isNoteInfoFill={isNoteInfoFill}
                 setIsNoteInfoFill={setIsNoteInfoFill}
                 changeChoosedNoteHandler={changeChoosedNoteHandler}
                 isBtnForRedirectionToEditorClicked={isBtnForRedirectionToEditorClicked}
                 choosedNoteDescription={choosedNoteDescription}
                 setChoosedNoteDescription={setChoosedNoteDescription}
                 choosedNoteTitle={choosedNoteTitle}
                 setChoosedNoteTitle={setChoosedNoteTitle}
                 isEditorOpened={isEditorOpened}
                 setIsEditorOpened={setIsEditorOpened}
                 updateNotes={updateNotes}
               />
             ) : (
               <Home
               setChoosedNoteIsDone={setChoosedNoteIsDone}
               setChoosedNoteBgColor={setChoosedNoteBgColor}
               arrayOfNoteFromFB={arrayOfNoteFromFB}
               fetchNotes={fetchNotes}
               deleteNotes={deleteNotes}
               setIsLoginFinished={setIsLoginFinished}
                 setArrayOfNotes={setArrayOfNotes}
                 setIsBtnForSearchNoteClicked={setIsBtnForSearchNoteClicked}
                 choosedCategory={choosedCategory}
                 setChoosedCategory={setChoosedCategory}
                 changedButtonHandler={changedButtonHandler}
                 delateNoteFromArrayHandler={delateNoteFromArrayHandler}
                 noteClickId={noteClickId}
                 setNoteClickId={setNoteClickId}
                 openFullNoteHandler={openFullNoteHandler}
                 isEditorOpened={isEditorOpened}
                 setIsEditorOpened={setIsEditorOpened}
                 arrayOfNotes={arrayOfNotes}
               />
             )
             :
             <SignAutorazationMenu setTextIntoWorryPopup={setTextIntoWorryPopup} setIsNoteInfoFill={setIsNoteInfoFill} isLogin={isLogin} setIsLogin={setIsLogin} setIsLoginFinished={setIsLoginFinished}/>
             }
             {
               isNoteInfoFill && <PopupNoteInfoFill popupText={textIntoWorryPopup}/>
             }
      </div>
     </>
  );
}

export default App;
