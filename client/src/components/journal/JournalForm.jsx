import React, { useRef, useCallback, useEffect } from "react";
import htmlToDraft from "html-to-draftjs";
import { stateToHTML } from "draft-js-export-html";
import moment from "moment";

import { Editor, EditorState, ContentState, RichUtils } from "draft-js";
// import { CLEAR_CURRENT } from "../../context/types";

const JournalForm = ({
  showForm,
  title,
  setTitle,
  setText,
  text,
  setShowForm,
  onSubmit,
  clearCurrent,
  edit,
}) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const handleKeyCommand = useCallback((command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  }, []);

  const _onClick = useCallback((e) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, e.target.name));
    // eslint-disable-next-line
  }, []);

  const covertHTMLtoState = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    return editorState;
  };

  const editor = useRef("");
  // const titleRef = useRef("");

  const onChange = (editorState) => {
    setEditorState(editorState);
    setText(stateToHTML(editorState.getCurrentContent()));
    // console.log(stateToHTML(editorState.getCurrentContent()));
  };

  const clearField = () => {
    setShowForm(false);
    setText("");
    setTitle(moment().format("MMM Do YY"));
    setEditorState(covertHTMLtoState(""));
    clearCurrent();
  };

  const onSave = () => {
    // setText(stateToHTML(editorState.getCurrentContent()));
    onSubmit();
    clearField();
  };

  useEffect(() => {
    if (showForm) {
      // titleRef.current.focus();
      editor.current.focus();
      if (edit) setEditorState(covertHTMLtoState(text));
    }
    // eslint-disable-next-line
  }, [showForm]);

  return (
    <div
      className={
        showForm
          ? "absolute bottom-0 right-0 left-0 top-0 flex flex-col"
          : "hidden"
      }
    >
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        type='text'
        className='p-2 px-3 m-1 outline-none  border-b-[1px] text-gray-700 font-semibold text-lg'
        placeholder='On this day...'
        // ref={titleRef}
      />

      <div
        className='h-full mx-5 mt-2 mb-1 overflow-y-auto  '
        style={{ fontWeight: "520", boxShadow: "" }}
        onClick={() => {
          editor.current.focus();
        }}
      >
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          className='border h-full border-green-800 '
        />
      </div>

      <div className='ml-1 flex options'>
        <button onClick={_onClick} name='BOLD'>
          <strong>B</strong>
        </button>
        <button onClick={_onClick} name='ITALIC'>
          <em className='font-serif'>I</em>
        </button>
      </div>

      <div className='flex m-1 mb-3'>
        <button
          onClick={onSave}
          className='p-1 px-2 mx-1  bg-[#339DFF] text-white text-base capitalize hover:opacity-80'
        >
          save
        </button>
        <button
          onClick={clearField}
          className='p-1 px-2 mx-1 bg-red-600 text-white capitalize hover:opacity-80'
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default JournalForm;
