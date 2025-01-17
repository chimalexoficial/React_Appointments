import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);


    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Validacion del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true);
        } else {
            setError(false);

            //objeto de paciente
            const objetoPaciente = {
                nombre,
                propietario,
                email,
                fecha,
                sintomas,
                id: generarId()
            }

            if (paciente.id) {
                //editando
                objetoPaciente.id = paciente.id;

                const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);

                setPacientes(pacientesActualizados);
                setPaciente({})


            } else {
                //agregando
                objetoPaciente.id = generarId();
                setPacientes([...pacientes, objetoPaciente]);

            }

            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
            console.log('Enviando formulario');

        }
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center">Añade pacientes y {''}
                <span className="text-indigo-600 font-bold">administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-2">

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre mascota
                    </label>

                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la masctoa"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre propietario
                    </label>

                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre de propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email
                    </label>

                    <input
                        id="email"
                        type="text"
                        placeholder="Email de contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta
                    </label>

                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)} />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas
                    </label>

                    <textarea
                        id="sintomas"
                        type="date"
                        placeholder="Describe los sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)} />
                </div>
                {/* {error && <Error mensaje='Todos los campos son obligatorios' />} */}

                {/* children option below */}
                {error && <Error>Todos los campos son obligatorios</Error>}

                <input type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    value={paciente.id ? 'Editar paciente' : 'Agregar paciente'} />



            </form>

        </div>
    )
}

export default Formulario;
