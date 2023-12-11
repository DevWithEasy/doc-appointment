import '../assets/css/loading.css'

const Loading = () => {

    return (
        <div
            className="fixed -top-2 left-0 h-screen w-full z-50 flex justify-center items-center bg-gray-500/70"
        >
            <div
                className="w-full mx-2 md:w-4/12 md:mx-auto"
            >
                <div className="loading-container">
                    <div className="loading-text">
                        <span>L</span>
                        <span>O</span>
                        <span>A</span>
                        <span>D</span>
                        <span>I</span>
                        <span>N</span>
                        <span>G</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Loading;