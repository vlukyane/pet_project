import React, {useEffect, useState} from "react";

interface IProps {
    email: string
}

const LastUpdated: React.FC<IProps> = ({email}) => {
    const [timer, setTimer] = useState(0);
    const [isVisible, setVisibility] = useState(true);
    const [lastEmail, setLastEmail] = useState('');

    useEffect(() => {
        if (lastEmail != email) {
            setLastEmail(email);
            setTimeout(() => {
                setVisibility(!isVisible);
                setLastEmail('');
            }, 5000);
        }
    });
    return (
        <>
            {isVisible
                ? (
                    lastEmail

                )
                : ('')
            }
        </>
    )
};

export default LastUpdated;

