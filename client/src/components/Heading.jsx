const Heading = ({children}) => {
    return (
        <h2
            className='p-2 text-center text-2xl font-bold border-b-2 border-slate-200'
        >
            {children}
        </h2>
    );
};

export default Heading;