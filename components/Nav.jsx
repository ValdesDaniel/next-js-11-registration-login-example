import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary shadow-lg">
            <div className="navbar-nav d-flex flex-row justify-content-center align-items-center">
                <NavLink href="/" exact className="nav-item nav-link text-center">Home</NavLink>
                <NavLink href="/users" className="nav-item nav-link text-center">Ficha Técnica</NavLink>
                <a onClick={logout} className="nav-item nav-link text-center">Cerrar Sesión</a>
            </div>
        </nav>
    );
}