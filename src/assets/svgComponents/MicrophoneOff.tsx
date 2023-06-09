const MicrophoneOff = ({ size = "32px", color = "black" }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="3"
            stroke={color}
            fill="none"
        >
            <path d="M47.67,28.43v3.38a15.67,15.67,0,0,1-31.34,0V28.43" strokeLinecap="round" />
            <path
                d="M41.07,24.44v7.34a8.89,8.89,0,0,1-8.89,8.89h-.65a5.66,5.66,0,0,1-1.31-.09"
                strokeLinecap="round"
            />
            <path
                d="M23.56,35.73a9,9,0,0,1-.92-3.95V15.34a8.89,8.89,0,0,1,8.89-8.89h.65a8.9,8.9,0,0,1,8,5"
                strokeLinecap="round"
            />
            <line x1="31.73" y1="57.34" x2="31.73" y2="47.71" strokeLinecap="round" />
            <line x1="37.14" y1="57.55" x2="26.43" y2="57.55" strokeLinecap="round" />
            <line x1="49" y1="6.99" x2="16.33" y2="52.53" strokeLinecap="round" />
        </svg>
    );
};

export default MicrophoneOff;
