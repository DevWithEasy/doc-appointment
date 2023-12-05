import { Helmet } from 'react-helmet'

// eslint-disable-next-line react/prop-types
const Head = ({title}) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <link rel="amader docor" href="http://amaderdoctor.onrender.com" />
        </Helmet>
    );
};

export default Head;