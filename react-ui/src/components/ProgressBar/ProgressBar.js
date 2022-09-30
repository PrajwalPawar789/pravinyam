import React from 'react'

const ProgressBar = ({ progress }) => {
    console.log("hello", progress);
    const Parentdiv = {
        height: '15px',
        width: '100%',
        backgroundColor: '#dcdcdc',
        borderRadius: 40,
    }

    const Childdiv = {
        height: '15px',
        width: `${progress}%`,
        backgroundColor: '#9966cc',
        borderRadius: 40,
        textAlign: 'right',
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}></div>
        </div>
    )
}


export default ProgressBar;