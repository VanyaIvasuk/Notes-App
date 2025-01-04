import { useEffect, useRef, useState } from "react";
import Note from "./Note";
import RenderNoteList from "./RenderNoteList";
import { json } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function NoteList({
  notes,
  openFullNoteHandler,
  noteClickId,
  setNoteClickId,
  delateNoteFromArrayHandler,
  changedButtonHandler,
  choosedCategory,
  themeIcon,
  setNotes,
  deleteNotes,
  fetchNotes,
  arrayOfNoteFromFB,
  setChoosedNoteBgColor,
  setChoosedNoteIsDone
}) {
  let noteRef = useRef([]);
  let ulRef = useRef();
  // let [doneNoteId, setDoneNoteId] = useState([]);
  let [isSeparatorClicked, setIsSaparatorClicked] = useState(true);
  let [canAnimate, setCanAnimate] = useState(true);
  let [canClick, setCanClick] = useState(true);
  let [noteClickedCounter, setNoteClickedCounter] = useState(1);
  let [showDoneTranslate, setShowDoneTranslate] = useState(0);
  let [doneNoteCounter, setDoneNoteCounter] = useState(0);
  let [isNoteDoneTrue, setIsNoteDoneTrue] = useState(false)
  let [idOfNotesFromFb, setIdOfNotesFromFb] = useState([])
  const doneNoteIds = JSON.parse(localStorage.getItem("DoneNoteId")) || [];


  const filteredDoneNote = (notes) =>
    notes.filter(function (note) {
      if (doneNoteIds.includes(note.id)) return note;
    });
  const filteredNotDoneNote = (notes) =>
    notes.filter(function (note) {
      if (!doneNoteIds.includes(note.id)) return note;
    });
  const filteredImmediateCategoryNotesArray = notes.filter(
    (note) => note.bgColor === "#FF9E9E"
  );
  const filteredNeededCategoryNotesArray = notes.filter(
    (note) => note.bgColor === "#FFF599"
  );
  const filteredInPlansCategoryNotesArray = notes.filter(
    (note) => note.bgColor === "#91F48F"
  );

  let doneNoteIndex;
  let noteHeight = 110;
  let noteGap = 25;
  let notesLength = notes.length - 1;


  function underNoteCheckBtnHandler(id) {
    
    setNoteClickedCounter((noteClickedCounter += 1));
    doneNoteIndex = notes.findIndex((note) => note.id === id);
    let updatedNotes
    updatedNotes = notes.map((note) => 
        note.id === id ? { ...note, isDone:  true}  :  note
    );
    updatedNotes = updatedNotes.map((note, i) => {
        if (i === doneNoteIndex) {
          return {
            ...note,
            translateY:
              (noteHeight + noteGap) * (notesLength - doneNoteIndex) + 45,
          };
        } else if (i > doneNoteIndex ) {
          return { ...note, translateY: -(noteHeight + noteGap) };
        }
        return { ...note, translateY: note.translateY};
      })

    setNotes(updatedNotes);
    setCanClick(false);
    setDoneNoteCounter((doneNoteCounter += 1));
    doneNoteCounter > 1 && setShowDoneTranslate(-(noteHeight + noteGap));
    setTimeout(() => {
      let updatedNotes = notes.filter((note) => note.id !== id);
      let doneNote = notes.find((note) => note.id === id);
      doneNote.isDone = true;
      setCanAnimate(false);
      setShowDoneTranslate((showDoneTranslate = 0));
      setNotes([...updatedNotes, doneNote]);
      localStorage.setItem(
        "arrayOfNotes",
        JSON.stringify([...updatedNotes, doneNote])
      );
        localStorage.setItem("DoneNoteId", JSON.stringify([...doneNoteIds, id]))
      setCanClick(true);
    }, 500);

    setCanAnimate(true);
  }
  let { userId } = useUserContext();

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

  const renderNote = (notes) =>
    notes.map(
      ({ title, bgColor, description, id, isDone, translateY }) => (
        <Note
        
        setChoosedNoteIsDone={setChoosedNoteIsDone}
        setChoosedNoteBgColor={setChoosedNoteBgColor}
        deleteNotes={deleteNotes}
          noteClickedCounter={noteClickedCounter}
          setNoteClickedCounter={setNoteClickedCounter}
          underNoteCheckBtnHandler={underNoteCheckBtnHandler}
          // doneNoteId={doneNoteId}
          noteRef={noteRef}
          changedButtonHandler={changedButtonHandler}
          delateNoteFromArrayHandler={delateNoteFromArrayHandler}
          noteClickId={noteClickId}
          setNoteClickId={setNoteClickId}
          openFullNoteHandler={openFullNoteHandler}
          title={title}
          description={description}
          bgColor={bgColor}
          key={id}
          id={id}
          isDone={isDone}
          setIsNoteDoneTrue={setIsNoteDoneTrue}
          translateY={translateY}
          canAnimate={canAnimate}
          canClick={canClick}
        />
      )
    );
   


  return (
    <ul ref={ulRef} className="relative">
      {choosedCategory === "" ? (
        <>
          <RenderNoteList
            canAnimate={canAnimate}
            showDoneTranslate={showDoneTranslate}
            themeIcon={themeIcon}
            renderNote={renderNote}
            setIsSaparatorClicked={setIsSaparatorClicked}
            isSeparatorClicked={isSeparatorClicked}
            filteredNotDoneNote={filteredNotDoneNote}
            filteredDoneNote={filteredDoneNote}
            firstArray={arrayOfNoteFromFB}
            secondArray={arrayOfNoteFromFB}
          />
        </>
      ) : choosedCategory === "immediate" ? (
        <>
          <RenderNoteList
            canAnimate={canAnimate}
            showDoneTranslate={showDoneTranslate}
            themeIcon={themeIcon}
            renderNote={renderNote}
            setIsSaparatorClicked={setIsSaparatorClicked}
            isSeparatorClicked={isSeparatorClicked}
            filteredNotDoneNote={filteredNotDoneNote}
            filteredDoneNote={filteredDoneNote}
            firstArray={filteredImmediateCategoryNotesArray}
            secondArray={filteredImmediateCategoryNotesArray}
          />
        </>
      ) : choosedCategory === "needed" ? (
        <>
          <RenderNoteList
            canAnimate={canAnimate}
            showDoneTranslate={showDoneTranslate}
            themeIcon={themeIcon}
            renderNote={renderNote}
            setIsSaparatorClicked={setIsSaparatorClicked}
            isSeparatorClicked={isSeparatorClicked}
            filteredNotDoneNote={filteredNotDoneNote}
            filteredDoneNote={filteredDoneNote}
            firstArray={filteredNeededCategoryNotesArray}
            secondArray={filteredNeededCategoryNotesArray}
          />
        </>
      ) : (
        choosedCategory === "inplans" && (
          <>
            <RenderNoteList
              canAnimate={canAnimate}
              showDoneTranslate={showDoneTranslate}
              themeIcon={themeIcon}
              renderNote={renderNote}
              setIsSaparatorClicked={setIsSaparatorClicked}
              isSeparatorClicked={isSeparatorClicked}
              filteredNotDoneNote={filteredNotDoneNote}
              filteredDoneNote={filteredDoneNote}
              firstArray={filteredInPlansCategoryNotesArray}
              secondArray={filteredInPlansCategoryNotesArray}
            />
          </>
        )
      )}
    </ul>
  );
}
