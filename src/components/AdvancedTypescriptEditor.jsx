import React,{Component} from 'react';
import MonacoEditor from 'react-monaco-editor'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {Uri} from 'monaco-editor/esm/vs/editor/editor.api';

import {files} from './typings';
import '../common.css'

const curLanguage = 'java';
const code =
`
`
export class AdvancedTypescriptEditor extends Component {

    constructor(props){
        super(props);

        this.state = {
            code,curLanguage
        }

        this.reloadMonacoData();

        this.reloadLanguage();
    }

    onMonacoChange(newValue, e) {
        window.localStorage.setItem('monaco-editor-online-value',newValue)
    }

    editorWillMount(monaco) {

        // validation settings
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });

        // compiler options
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES6,
            allowNonTsExtensions: true
        });

        for (const fileName in files) {
            const fakePath = `file:///node_modules/@types/${fileName}`;

            monaco.languages.typescript.typescriptDefaults.addExtraLib(
                files[fileName],
                fakePath
            );
        }
    }

    editorDidMount(editor, monaco) {
        editor.focus();
    }

    render() {

        const languages = ['java','typescript','python','sql','xml','yaml','shell','html','css','go','markdown'];
        const listItems = languages.map((item) =>
            <option value={item} key={item}>{item}</option>
        );
        const options = {
            selectOnLineNumbers: true,
            model: monaco.editor.getModel(Uri.parse("file:///main.tsx"))
                ||
                monaco.editor.createModel(code, curLanguage, monaco.Uri.parse("file:///main.tsx")),
            minimap: {
                enabled:true
            }
        }
        return (
            <div>
                <div className="d-flex justify-content-center"> 
                    <span className="title">Monaco-Editor</span>
                    <select className="language" value={this.state.curLanguage} onChange={this.handleLanguageChange}>
                        {listItems}
                    </select>
                </div>
                <div className="momacoClass">
                    <MonacoEditor
                        language={this.state.curLanguage}
                        theme="vs"
                        defaultValue=''
                        value={this.state.code}
                        onChange={this.onMonacoChange}
                        editorWillMount={this.editorWillMount}
                        editorDidMount={this.editorDidMount}
                        options={options}
                    />
                </div>
            </div>
        )
    }

    handleLanguageChange = e => {
        this.setState({
            curLanguage: e.target.value
        });

        window.localStorage.setItem('monaco-editor-language-value',e.target.value);
        
        this.reloadMonacoData();
    };

    reloadMonacoData(){
        const storeData = window.localStorage.getItem('monaco-editor-online-value');
        if(storeData){
            setTimeout(() => {
                this.setState({  code: storeData  })
            }, 100);;
        }
    }

    reloadLanguage(){
        const langData = window.localStorage.getItem('monaco-editor-language-value');
        if(langData){
            setTimeout(() => {
                this.setState({  curLanguage: langData  })
            }, 100);;
        }
    }
}