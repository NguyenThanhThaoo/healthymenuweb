// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { InputLabel, Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './style.module.scss';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox(props) {
    const { inputValue, textError } = props;

    return (
        <Stack className={styles.container}>
            {props.label && (
                <Stack className={styles.lableContainer}>
                    <InputLabel className={styles.lable}>{props.label}</InputLabel>
                    {props.required && <Typography className={styles.required}>(*)</Typography>}
                </Stack>
            )}
            <Stack className={styles.inputContainer}>
                <Stack className={styles.clearBtnContainer}>
                    <SearchIcon className={styles.clearButton} />
                </Stack>
                <input
                    className={[styles.input, textError && styles.inputError].join(' ')}
                    type={props.type}
                    value={inputValue}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                    onBlur={props.validateInput}
                    autoFocus={props.autoFocus}
                />
            </Stack>
        </Stack>
    );
}
