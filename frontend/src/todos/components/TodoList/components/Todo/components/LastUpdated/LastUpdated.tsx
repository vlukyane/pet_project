import React, {useEffect, useState} from "react";
import './LastUpdated.css';

interface IProps {
    ctx: {
        email: string,
        color: string
    }
    content: string,
    isCompleted: boolean
}

const LastUpdated: React.FC<IProps> = ({ ctx, content, isCompleted}) => {

    const {email, color} = ctx;
    const [isVisible, setVisibility] = useState(false);
    const [timeOutId, setTimeOutId] = useState();
    const [lastEmail, setLastEmail] = useState(email);
    const [lastContent, setLastContent] = useState(content);
    const [completed, setCompleted] = useState(isCompleted);

    useEffect(() => {
        if (lastEmail === email && lastContent === content && completed === isCompleted) return;
        clearTimeout(timeOutId);
        setVisibility(true);
        setLastEmail(email);
        setLastContent(content);
        setCompleted(isCompleted);
        const timerId = setTimeout(() => {
            setVisibility(false);
        }, 5000);
        setTimeOutId(timerId);
    });

    return (
        <span
            style={{color: color}}
        >
            {isVisible? email : ''}
        </span>
    )
};

export default LastUpdated;
