import React, {useEffect, useState} from "react";
import './LastUpdated.css';

interface IProps {
    email: string,
    content: string,
    isCompleted: boolean
}

const LastUpdated: React.FC<IProps> = ({email, content, isCompleted}) => {

    const [isVisible, setVisibility] = useState(false);
    const [timeOutId, setTimeOutId] = useState();
    const [lastEmail, setLastEmail] = useState(email);
    const [lastContent, setLastContent] = useState(content);
    const [completed, setCompleted] = useState(isCompleted);
    const [spanColor, setSpanColor] = useState();

    useEffect(() => {
        if (lastEmail === email && lastContent === content && completed === isCompleted) return;
        clearTimeout(timeOutId);
        setVisibility(true);
        setLastEmail(email);
        setLastContent(content);
        setCompleted(isCompleted);
        email !== '' ? setSpanColor(calculateColor(email)) : setSpanColor('transparent');
        const timerId = setTimeout(() => {
            setVisibility(false);
        }, 5000);
        setTimeOutId(timerId);
    });

    const calculateColor = (email: string = '') => {
        if (email === '') return;
        const hash = email.split('').reduce( (previousValue, currentValue, index) => {
            return previousValue + Math.pow(email.charCodeAt(index),2) + 1;
        }, 0);
        let hex = Number(Math.pow(hash, email.length)).toString(16);
        hex = "#" + "000000".substr(0, 6 - hex.length) + hex;
        console.log(hex)
        return hex;
    };

    return (
        <span
            style={{color: spanColor}}
        >
            {isVisible? email : ''}
        </span>
    )
};

export default LastUpdated;

