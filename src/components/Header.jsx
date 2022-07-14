function Header() { //si pongo props traigo todos los definidos , si no destructuring con el nombre del prop ej numero
    
    return (
        
        <h1 className="font-black text-5xl text-center md:w-2/3 mx-auto">
            Seguimiento pacientes{' '} 
            <span className="text-indigo-600">Veterinaria</span>
        </h1>
        
    )
}

export default Header;