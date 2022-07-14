import {useState, useEffect} from "react"
import Error from "./Error";

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
//estos son los hook
    const [nombre, setNombre] = useState('');    
    const [propietario, setPropietario] = useState('');    
    const [email, setEmail] = useState('');    
    const [fecha, setFecha] = useState('');    
    const [sintomas, setSintomas] = useState('');    
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if ( Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        }
    },[paciente])
    
    //funcion para generar ID aleatorio
    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        
        return fecha + random
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        //validacion de formulario
        if ([nombre, propietario,email, fecha, sintomas].includes('')) {
            console.log('Hay al menos un campo vacio')
            setError(true)
            return;
        }
        setError(false)       
        
        //objeto de pacientes
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas            
        }
        
        if (paciente.id) {
            //editando registro
            objetoPaciente.id = paciente.id
            const pacienteActualizados = pacientes.map(pacienteState => pacienteState.id ===
            paciente.id ? objetoPaciente : pacienteState)
            setPacientes(pacienteActualizados)
            setPaciente({})
        }else{
            //nuevo registro
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }
        
        //reiniciar form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')

    }
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade pacientes y {' '}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form 
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleSubmit}
                >
                { error && 
                    <Error>
                        <p>Todos los campos son obligatorios</p>
                    </Error>
                }
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange= { (e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange= { (e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange= { (e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange= { (e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange= { (e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
                    hover:bg-indigo-900 cursor-pointer transition-all"
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
                    type="submit"
                    
                />
            </form>
        </div>
    )
}

export default Formulario

//clase 69 es la que sigue! 