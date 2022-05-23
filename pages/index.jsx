import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4 bg-white">
            <div className="container d-flex flex-column justify-content-center align-items-center shadow-lg w-75 p-5">
            <img src='https://senacyt-my.sharepoint.com/:i:/r/personal/pasanteit_senacyt_gob_pa/Documents/Logo.png?csf=1&web=1&e=uKoHjq' className='img-fluid shadow-4 mx-auto my-2' alt='...' style={{ maxWidth: '14rem', minWidth: '10rem' }} />
                <h1 className='text-center'>Bienvenido {userService.userValue?.firstName}!</h1>
                <p><Link href="/users">Ver Proyectos</Link></p> 
            </div>
        </div>
    );
}
