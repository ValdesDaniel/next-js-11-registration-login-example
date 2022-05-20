import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Bienvenido {userService.userValue?.firstName}!</h1>
                <p><Link href="/users">Ver Proyectos</Link></p>
                
            </div>
        </div>
    );
}
