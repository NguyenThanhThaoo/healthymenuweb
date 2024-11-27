import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './fixButton.module.scss'
import classNames from "classnames/bind";
const cx = classNames.bind(styles)

const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={cx(className, 'showArrow', 'prev')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    );
};
const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
        <div className={cx(className, 'showArroww', 'next')} onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
        </div>
    );
};

export { PreviousBtn, NextBtn }