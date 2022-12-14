import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'

// saving imports
import { saveAs } from 'file-saver';
import JSZip from 'JSZip';

//import files

const Download = () => {

  const projectName = useSelector(state => state.webpack.projectName);
  const template = useSelector(state => state.webpack.template);
  const webpackString = useSelector(state => state.webpack.webpack);

  const download = () => {
    const zip = new JSZip();

    const projectFolder = zip.folder(projectName);
    projectFolder.file("webpack.config.js", webpackString);

    let entryPath;
    const path = template.entry.split('/');

    if (path.length > 1) {
      for (let i = 0; i < path.length-1; i++) {
        if (i === 0) entryPath = projectFolder.folder(path[i]);
        else entryPath = entryPath.folder(path[i]);
      }
      entryPath.file(path[path.length-1], '');
    }
    else projectFolder.file(path, '');
    
    zip.generateAsync({type:"blob"}).then(function(content) {
        // saveAs from FileSaver.js
        saveAs(content, "webpack.zip");
    });
  }

  return (
    <button className="download" onClick={download}>
      DOWNLOAD
    </button>
  );
};

// steps to do

// IN WebpackCode add:
// add   const dispatch = useDispatch()
// use   dispatch(actions.saveWebpackCodeActionCreator(webpackString))
// do this to save webpack code content in state which we'll pull from here


export default Download;
