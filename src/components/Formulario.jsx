/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import Error from "./Error"

const Formulario = ({ setPacientes, pacientes, paciente }) => {
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [fecha, setFecha] = useState()
    const [error, setError] = useState(false)

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setSintomas(paciente.sintomas)
            setFecha(paciente.fecha)
        }
    }, [paciente]);

    const changeNombre = (e) => setNombre(e.target.value)

    const changePropietario = (e) => setPropietario(e.target.value)

    const changeEmail = (e) => setEmail(e.target.value)

    const changeFecha = (e) => setFecha(e.target.value)

    const changeSintomas = (e) => setSintomas(e.target.value)

    const handleClearFrom = () => {
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    const generarId = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return fecha + random
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, sintomas, fecha].includes(''))
            return setError(true)

        const obj = {
            nombre,
            email,
            propietario,
            fecha,
            sintomas,
        }

        if (paciente.id) {
            obj.id = paciente.id
            const objAct = pacientes.map((p) =>
                p.id === paciente.id ? obj : p)
            setPacientes(objAct)
        } else {
            obj.id = generarId()
            setPacientes([...pacientes, obj])
        }

        handleClearFrom()
        return setError(false)
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                onSubmit={handleOnSubmit}>
                {error &&
                    <Error>
                        <p>Todos los campos son obligatorios</p>
                    </Error>
                }
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="mascota">
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre de la mascota..."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="mascota"
                        value={nombre}
                        onChange={changeNombre} />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="propietario">
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre del propietario..."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="propietario"
                        value={propietario}
                        onChange={changePropietario}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email propietario..."
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        value={email}
                        onChange={changeEmail}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="alta">
                        Fecha Alta
                    </label>
                    <input
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="alta"
                        value={fecha}
                        onChange={changeFecha}
                    />
                </div>
                <div className="mb-5">
                    <label
                        className="block text-gray-700 uppercase font-bold"
                        htmlFor="sintomas">
                        Sinstomas
                    </label>
                    <textarea
                        placeholder="Describa los sintomas..."
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={changeSintomas}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer hover:bg-indigo-700 transition-all"
                    value={`${paciente.id ? 'Editar' : 'Agregar'} paciente`}
                />
            </form>
        </div>
    )
}

export default Formulario
