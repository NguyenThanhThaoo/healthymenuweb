// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import React from 'react';
// import Editor from 'ckeditor5-custom-build/build/ckeditor'
// import classNames from "classnames/bind";
// import styles from './takeNotes.module.scss'
// // import './takeNotes.css'
// import { memo } from "react";
// // import { updateImage } from "../../../../../API/userRequest";

// const cx = classNames.bind(styles)


// const TakeNotes = ({ handleSetValueTakeNote, valueOfTakeNote = '' }) => {

//     return (
//         <div className={cx("wrapper")}>
//             <div className={cx('inputContent')}>
//                 <CKEditor
//                     editor={Editor}
//                     config={{
//                         placeholder: "Nhập nội dung ở đây...",
//                         toolbar: {
//                             items: [
//                                 'undo',
//                                 'redo',
//                                 'heading',
//                                 'fontSize',
//                                 '|',
//                                 'blockQuote',
//                                 'bold',
//                                 'italic',
//                                 'underline',
//                                 'numberedList',
//                                 'alignment',
//                             ]
//                         },

//                     }}
//                     data={valueOfTakeNote}


//                     onChange={(event, editor) => {
//                         const data = editor.getData();
//                         handleSetValueTakeNote(data)
//                     }}
//                 // onBlur={(event, editor) => {
//                 //     console.log("Blur.", editor);
//                 // }}
//                 // onFocus={(event, editor) => {
//                 //     const data = editor.getData();
//                 //     console.log("Focus.", editor, data);
//                 // }}
//                 />
//                 {/* <div>Da luu</div> */}
//             </div>
//         </div>
//     );
// };

// export default memo(TakeNotes);
