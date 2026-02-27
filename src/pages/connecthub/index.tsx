import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { FaUser, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiContactsBookFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

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
    type IUser = IUserForm & {userId: string}

    const [allUsers, setUsers] = useState<IUser[]>(() => {
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

    const [isConntactSidebarOpen, setIsConntactSidebarOpen] = useState(false)
    const [hasNotification, setNotification] = useState(false)
    const [activeUserEmail, setActiveUserEmail] = useState<string | null>(null)
    function submitForm(data: IUserForm){
        reset()

        const newUSer: IUser = ({
            userId: crypto.randomUUID(),
            userName: data.userName,
            userEmail: data.userEmail,
            userNumber: data.userNumber
        })

        hasNotification ? '' : setNotification(!hasNotification)
        setUsers(oldState => [newUSer, ...oldState])
    }

    function openSidebar(sidebar: "contact" | "task"){
        setActiveUserEmail(null)
        sidebar === "contact" ? setIsConntactSidebarOpen(!isConntactSidebarOpen) : ''
        hasNotification ? setNotification(!hasNotification) : '' 
    }

    function deleteContact(userId: string): void {
        const newUsers = allUsers.filter(user => user.userId !== userId)
        setUsers(newUsers)
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className='text-4xl font-bold text-sky-500 text-center'>CONNECTHUB</h1>

                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-end pt-10 gap-10">
                    <div className="relative w-full">
                        <label htmlFor="userName" className="absolute -top-5 left-3 text-[0.8rem]">Nome Completo</label>
                        <input type="text" placeholder="..." id="userName" { ...register("userName") } className="border bg-slate-800 border-slate-700 rounded-xl w-full px-5 py-1 outline-0"/>
                            {errors.userName && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userName.message} </span>}
                    </div>
                    <div className="flex gap-10">
                        <div className="relative">
                            <label htmlFor="userEmail" className="absolute -top-5 left-3 text-[0.8rem]">E-mail</label>
                            <input type="text" placeholder="..." id="userEmail" { ...register("userEmail") } className="border bg-slate-800 border-slate-700 rounded-xl w-100 px-5 py-1 outline-0"/>
                            {errors.userEmail && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userEmail.message} </span>}
                        </div>
                        <div className="relative">
                            <label htmlFor="userNumber" className="absolute -top-5 left-3 text-[0.8rem]">Telefone</label>
                            <input type="number" placeholder="..." id="userNumber" { ...register("userNumber") } className="border bg-slate-800 border-slate-700 rounded-xl w-50 px-5 py-1 outline-0"/>
                            {errors.userNumber && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {errors.userNumber.message} </span>}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-green-400 hover:border-green-400 transition-all duration-100" type="submit">Enviar</button>
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-100" type="reset" onClick={() => reset()}>Limpar</button>
                    </div>
                </form>   

                <aside className={`${isConntactSidebarOpen ? 'w-120' : 'w-0'} transition-width duration-400 fixed left-0 top-0 h-[90vh] mt-20 border-r border-slate-700 bg-slate-800 p-5`}>
                    <div onClick={() => openSidebar("contact")} className='absolute right-[-2.8rem] top-15 py-4 px-3 rounded-r-xl border-t border-b border-r border-slate-700 bg-slate-800 cursor-pointer hover:text-sky-500'>
                        { hasNotification ? <span className='absolute top-0 -right-0.5 rounded-xl bg-green-400 w-2.25 h-2.25 border border-green-600'></span> : ''}
                        <RiContactsBookFill className='size-5'/>
                    </div>
                    <section className='relative w-full h-full overflow-hidden'>
                        <h1 className='text-3xl font-bold text-slate-100 text-left py-5 whitespace-nowrap'>Meus Contatos</h1>
                        { allUsers.length == 0 ? <span className='text-slate-400 text-sm text-center whitespace-nowrap'>Você ainda não cadastrou nenhum contato</span> : ''}
                        <div className='hideScrollbar flex flex-col justify-start gap-3 h-[72vh] overflow-scroll'>
                            {
                                allUsers.length > 0 && (
                                    allUsers.map((user) => (
                                        <div key={user.userId} className='relative flex justify-between border-l border-sky-500 pl-5'>
                                            <div className='absolute right-0 top-0 cursor-pointer'>
                                                <BsThreeDotsVertical onClick={() => setActiveUserEmail(activeUserEmail === user.userId ? null : user.userId)} className='text-slate-400 hover:text-sky-500'/>
                                                <div className={`${activeUserEmail === user.userId ? 'block' : 'hidden'} border border-slate-700 rounded-md overflow-hidden bg-slate-800 absolute right-1 top-6`}>
                                                    <p className='border-slate-700 px-3 py-0.5 whitespace-nowrap hover:text-slate-300'>Atualizar contato</p>
                                                    <p onClick={() => deleteContact(user.userId)} className='border-t border-slate-700 px-3 py-0.5 whitespace-nowrap hover:text-slate-300'>Deletar contato</p>
                                                </div>
                                            </div>
                                            
                                            <div className='flex flex-col'>
                                                <p className='flex gap-3 items-center'>
                                                    <FaUser className='text-sky-400'/> 
                                                    {user.userName}
                                                </p>
                                                <p className='flex gap-3 items-center'>
                                                    <MdEmail className='text-sky-400 size-[1.1rem]'/> 
                                                    {user.userEmail}
                                                </p>
                                                <p className='flex gap-3 items-center'>
                                                    <FaPhone className='text-sky-400 size-[0.9rem]'/>
                                                    {user.userNumber}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) 
                            }
                        </div>
                        <div className='flex justify-center w-full'>
                            <span className='absolute bottom-12 h-px w-[25%] bg-slate-600'></span>
                            <span className='absolute bottom-10 h-px w-[5%] bg-slate-600'></span>
                        </div>
                    </section>
                </aside>
            </div> 
        </>
    )
}