import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ConnectHub(){
    const formRules = z.object({
        userName: z.string().min(5, "Campo Obrigatório | Digite o nome completo"),
        userEmail: z.email("Campo Obrigatório | Digite um e-mail válido"),
        userNumber: z
            .string()
            .regex(/^\d+$/, "Apenas números")
            .min(1, "Campo Obrigatório")
            .max(11, "Número Grande Demais")
            .refine((value) => value.length === 11, {
                message: "Inclua o DDD (11 dígitos no total)"
            })
    })

    type IUserForm = z.infer<typeof formRules>

    const [allUsers, setUser] = useState<IUserForm[]>(() => {
        const storedUsers = localStorage.getItem("users")
        return storedUsers ? JSON.parse(storedUsers) : []
    })

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(allUsers))
    }, [allUsers])
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        } = useForm <IUserForm>({
        resolver: zodResolver(formRules)
    })

    function submitForm(data: IUserForm){
        reset()

        const newUSer: IUserForm = ({
            userName: data.userName,
            userEmail: data.userEmail,
            userNumber: data.userNumber
        })

        setUser(oldState => [...oldState, newUSer])
        console.log(allUsers)
    }

    
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className='text-4xl font-bold text-sky-500 text-center'>CONNECTHUB</h1>

                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-end pt-10 gap-10">
                    <div className="relative w-full">
                        <label htmlFor="userName" className="absolute -top-5 left-3 text-[0.8rem]">Nome Completo</label>
                        <input type="text" placeholder="..." id="userName" { ...register("userName") } className="border bg-slate-800/80 border-slate-700 rounded-xl w-full px-5 py-1 outline-0"/>
                            {errors.userName && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userName.message} </span>}
                    </div>
                    <div className="flex gap-10">
                        <div className="relative">
                            <label htmlFor="userEmail" className="absolute -top-5 left-3 text-[0.8rem]">E-mail</label>
                            <input type="text" placeholder="..." id="userEmail" { ...register("userEmail") } className="border bg-slate-800/80 border-slate-700 rounded-xl w-100 px-5 py-1 outline-0"/>
                            {errors.userEmail && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userEmail.message} </span>}
                        </div>
                        <div className="relative">
                            <label htmlFor="userNumber" className="absolute -top-5 left-3 text-[0.8rem]">Telefone</label>
                            <input type="number" placeholder="..." id="userNumber" { ...register("userNumber") } className="border bg-slate-800/80 border-slate-700 rounded-xl w-50 px-5 py-1 outline-0"/>
                            {errors.userNumber && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userNumber.message} </span>}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-green-400 hover:border-green-400 transition-all duration-100" type="submit">Enviar</button>
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-100" type="reset" onClick={() => reset()}>Limpar</button>
                    </div>
                </form>   

                { 
                    allUsers.length > 0 && (

                        <div className='w-180 flex flex-col gap-3 py-5'>
                            <h1 className='text-3xl font-bold text-slate-100 text-left my-5'>Seus Contatos</h1>

                            {
                                allUsers.map((user) => (
                                    <div key={user.userEmail} className='flex justify-between border-l border-sky-500 px-5'>
                                        <div className='flex flex-col'>
                                            <p className='flex gap-3 items-center'>
                                                <FaUser className='text-sky-400'/> 
                                                {user.userName}
                                            </p>

                                            <p className='flex gap-3 items-center'>
                                                <MdEmail className='text-sky-400'/> 
                                                {user.userEmail}
                                            </p>
                                        </div>

                                        <p className='flex gap-3 items-center'>
                                            {user.userNumber}
                                            <FaPhone className='text-sky-400'/>
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                    ) 
                }
            </div> 
        </>
    )
}