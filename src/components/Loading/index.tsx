const Component = props =>
{
    const {isLoading/*, timedOut, error, retry*/} = props;

    return <>
        {isLoading && <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100vh',
            overflow: 'hidden'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
            }}>
                <div style={{
                    padding: '2rem',
                    animation: 'rotation 2s infinite linear',
                    fontSize: '5rem',
                    color: '#482684',
                    width: '100px',
                    height: '100px'
                }}>
                    &#9862;
                </div>
            </div>
        </div>}
    </>;
};

export default Component;