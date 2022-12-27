import loading from './load.gif'

export const Preloader = () => {
    return (
        <div className='py-4 text-center'>
            <img src={loading} alt="Loading..." />
        </div>
    );
}