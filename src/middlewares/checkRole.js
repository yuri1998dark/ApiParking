export const checkRole= (...role) =>{
    return (req, res, next) => {
        const allowedRoles = ['ADMIN', 'CLIENT', 'EMPLOYEE'];
        if (allowedRoles.includes(role)) {
            if (req.user && req.user.role === role) {
                next(); // El rol del usuario coincide, continuar con la siguiente función middleware
            } else {
                res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
            }
        } else {
            res.status(500).json({ message: 'Rol no válido' });
        }
    };
}

