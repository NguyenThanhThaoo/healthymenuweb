import React, { useContext, useState } from "react";
import { StoreContext } from '../../../store'
import {
    Editor,
    EditorState,
    RichUtils,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import Toolbar from "./Toolbar/Toolbar";
import classNames from 'classnames/bind'
import styles from './BraftEditor.module.scss'
const cx = classNames.bind(styles)

const DraftEditor = ({ mesage }) => {
    const context = useContext(StoreContext)
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            convertFromRaw({
                blocks: [
                    {
                        key: "",
                        text: context.getBlog || context.comment,
                        type: "",
                        depth: 0,
                        inlineStyleRanges: [
                        ],
                        entityRanges: [],
                        data: {},
                    }
                ],
                entityMap: {},
            })

        ),


    );
    // const editor = useRef(null);
    // useEffect(() => {
    //     focusEditor();
    // }, []);

    // const focusEditor = () => {
    //     editor.current.focus();

    // };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    };

    // FOR INLINE STYLES
    const styleMap = {
        CODE: {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2,
        },
        HIGHLIGHT: {
            backgroundColor: "#F7A5F7",
        },
        UPPERCASE: {
            textTransform: "uppercase",
        },
        LOWERCASE: {
            textTransform: "lowercase",
        },
        CODEBLOCK: {
            fontFamily: '"fira-code", "monospace"',
            fontSize: "inherit",
            background: "#ffeff0",
            fontStyle: "italic",
            lineHeight: 1.5,
            padding: "0.3rem 0.5rem",
            borderRadius: " 0.2rem",
        },
        SUPERSCRIPT: {
            verticalAlign: "super",
            fontSize: "80%",
        },
        SUBSCRIPT: {
            verticalAlign: "sub",
            fontSize: "80%",
        },
    };

    // FOR BLOCK LEVEL STYLES(Returns CSS Class From DraftEditor.css)
    const myBlockStyleFn = (contentBlock) => {
        const type = contentBlock.getType();
        switch (type) {
            case "blockQuote":
                return "superFancyBlockquote";
            case "leftAlign":
                return "leftAlign";
            case "rightAlign":
                return "rightAlign";
            case "centerAlign":
                return "centerAlign";
            case "justifyAlign":
                return "justifyAlign";
            default:
                break;
        }
    };

    return (
        <div className={cx("editor-wrapper")} >
            <Toolbar editorState={editorState} setEditorState={setEditorState} />
            <div className={cx("editor-container")}>
                <Editor
                    placeholder={mesage}
                    handleKeyCommand={handleKeyCommand}
                    editorState={editorState}
                    customStyleMap={cx(styleMap)}
                    textAlignment={context.getBlog}
                    blockStyleFn={cx(myBlockStyleFn)}
                    onChange={(editorState) => {
                        const contentState = editorState.getCurrentContent();
                        console.log(convertToRaw(contentState))
                        context.setGetBlog(convertToRaw(contentState).blocks[0].text);
                        context.setComment(convertToRaw(contentState).blocks[0].text);
                        setEditorState(editorState);
                    }}

                />
            </div>
        </div>
    );
};

export default DraftEditor;
