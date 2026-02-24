import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { IoIosWarning } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";


export function TaskMaster(){
    const formRules = z.object({
        taskTitle: z.string().min(5, 'Este campo é obrigatório e deve ter no mínimo 5 caracteres!').max(100, "Máximo de 100 caracteres!"),
        taskType: z.string().max(30, "Máximo de 30 caracteres!").transform((value) => value.trim() === "" ? "Sem Categoria" : value),
        taskPriority: z.enum(["100", "75", "50", "25", "0"], {message: "Selecione uma prioridade válida!" })
    })

    type ITaskForm = z.infer<typeof formRules>

    type ITask = ITaskForm & {
        taskId: string
    }

    const [allTasks, setTasks] = useState<ITask[]>([])

    function addTask(task: ITaskForm): void{
        const {taskTitle, taskType, taskPriority} = task

        const newTask: ITask = {
            taskId: Math.random().toString(36).substring(2, 9),
            taskTitle,
            taskType,
            taskPriority
        }

        setTasks(oldState => [...oldState, newTask])
    }

    function deleteTask(taskId: string): void{
        setTasks(oldState => 
            oldState.filter(task => task.taskId !== taskId)
        )
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
        } = useForm<ITaskForm>({
        resolver: zodResolver(formRules),
    })

    function submitForm(data: ITaskForm) {
        addTask(data)
        reset()
    }

    return (
        <>
        <div className="flex flex-col items-center justify-center gap-10">
            <h1 className='text-4xl font-bold text-sky-500 text-center'>TASKMASTER</h1>

            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-end pt-10 gap-10">
                <div className="flex gap-10">
                    <div className="relative">
                        <label htmlFor="taskTitle" className="absolute -top-5 left-3 text-[0.8rem]">Título</label>
                        <input type="text" placeholder="..." id="taskTitle" {...register('taskTitle')} className="border bg-slate-800/80 border-slate-700 rounded-xl w-100 px-5 py-1 outline-0"/>
                        {errors.taskTitle && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]">{errors.taskTitle.message}</span>}
                    </div>
                    <div className="relative">
                        <label htmlFor="taskType" className="absolute -top-5 left-3 text-[0.8rem]">Categoria</label>
                        <input type="text" placeholder="..." id="taskType" {...register('taskType')} className="border bg-slate-800/80 border-slate-700 rounded-xl w-50 px-5 py-1 outline-0"/>
                        {errors.taskType && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]">{errors.taskType.message}</span>}
                    </div>
                    <div className="relative">
                        <label htmlFor="taskPriority" className="absolute -top-5 left-3 text-[0.8rem]">Prioridade</label>
                        <select id="taskPriority" {...register('taskPriority')} className="border bg-slate-800/80 border-slate-700 rounded-xl w-50 px-5 py-1">
                            <option value="">Selecione</option>
                            <option value="100">Emergência</option>
                            <option value="75">Muita Urgência</option>
                            <option value="50">Urgência</option>
                            <option value="25">Pouca Urgência</option>
                            <option value="0">Sem Urgência</option>
                        </select>
                        {errors.taskPriority && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]">{errors.taskPriority.message}</span>}
                    </div>
                </div>

                <div className="flex gap-6">
                    <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-green-400 hover:border-green-400 transition-all duration-100" type="submit">Enviar</button>
                    <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-100" type="reset" onClick={() => reset()}>Limpar</button>
                </div>
            </form>

            <div className='relative w-220 flex flex-col gap-5 px-5'>
                {
                    allTasks.map((task) => {
                        let priorityColor = ""

                        if (task.taskPriority === "100") {
                            priorityColor = "text-red-500"
                        } else if (task.taskPriority === "75") {
                            priorityColor = "text-orange-500"
                        } else if (task.taskPriority === "50") {
                            priorityColor = "text-yellow-500"
                        } else if (task.taskPriority === "25") {
                            priorityColor = "text-green-400"
                        } else {
                            priorityColor = "text-blue-400"
                        }

                        return (
                            <li key={task.taskId} className='relative flex justify-between items-center w-full'>
                                <span>{task.taskTitle}</span>
                                <div className='flex gap-10 items-center'>
                                    <span>{task.taskType}</span>
                                    <div className='flex gap-5'>
                                        <span className={`flex justify-center items-center border rounded-sm px-2 py-2 cursor-pointer ${priorityColor}`}>
                                            <IoIosWarning/>
                                        </span>
                                        <span className="flex justify-center items-center border rounded-sm px-2 py-2 cursor-pointer text-red-500" onClick={() => deleteTask(task.taskId)}>
                                            <FaTrashAlt/>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}