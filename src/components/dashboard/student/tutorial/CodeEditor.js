import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

const LANGUAGE = ["java"];

const CodeEditor = (props) => {
  const [code, setCode] = useState(props.code);
  const language = LANGUAGE[props.languageIndex];

  function onChange(next) {
    setCode(next);
  }

  return (
    <div>
      <AceEditor
        style={props.style}
        mode={language}
        value={props.code}
        theme="github"
        onChange={props.onChange}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default CodeEditor;
