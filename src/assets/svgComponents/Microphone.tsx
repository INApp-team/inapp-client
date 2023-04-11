const Microphone = ({ size = "32px", color = "black" }) => {
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
            <rect x="22.51" y="6.45" width="18.44" height="34.22" rx="8.89" strokeLinecap="round" />
            <line x1="31.73" y1="57.34" x2="31.73" y2="47.71" strokeLinecap="round" />
            <line x1="37.14" y1="57.55" x2="26.43" y2="57.55" strokeLinecap="round" />
        </svg>
    );
};
export default Microphone;
