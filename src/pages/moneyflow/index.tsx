import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { GoHistory } from "react-icons/go";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";


export function MoneyFlow(){
    const incomeRules = z.object({
        incomeValue: z.number("Valor de entrada inválido").positive("Valor de entrada inválido"),
        incomeDescription: z.string().transform((value) => value.trim() === "" ? "Transação Sem Descrição" : value)
    })

    const expenseRules = z.object({
        expenseValue: z.number("Valor de saída inválido").positive("Valor de saída inválido"),
        expenseDescription: z.string().transform((value) => value.trim() === "" ? "Transação Sem Descrição" : value)
    })

    type IIncomeForm = z.infer<typeof incomeRules>
    type IExpenseForm = z.infer<typeof expenseRules>

    const {
        register: incomeRegister,
        handleSubmit: incomeHandleSubmit,
        formState: { errors: incomeErrors },
        reset: incomeReset
        } = useForm<z.input<typeof incomeRules>,
            any,
            z.output<typeof incomeRules>>({
        resolver: zodResolver(incomeRules),
    })

    const {
        register: expenseRegister,
        handleSubmit: expenseHandleSubmit,
        formState: { errors: expenseErrors },
        reset: expenseReset
        } = useForm<z.input<typeof expenseRules>,
            any,
            z.output<typeof expenseRules>>({
        resolver: zodResolver(expenseRules),
    })

    const [balanceValue, setBalanceValue] = useState<number>(0)

    const [isModalOpen, setIsModalOpen] = useState(false)

    function toggleModal(): void {
        setIsModalOpen(!isModalOpen)
    }

    interface ITransaction {
        transactionId: string
        transactionType: string
        transactionValue: number
        transactionDescription: string
    }

    const [allTransactions, setTransaction] = useState<ITransaction[]>([])
    
    function incomeSubmit(data: IIncomeForm) {
        const newTransaction: ITransaction = {
            transactionId: Math.random().toString(36).substring(2, 9),
            transactionType: "income",
            transactionValue: data.incomeValue,
            transactionDescription: data.incomeDescription
        }

        incomeReset()
        setBalanceValue(balanceValue + data.incomeValue)
        setTransaction(oldState => [newTransaction, ...oldState])    
}

    function expenseSubmit(data: IExpenseForm) {
        const newTransaction: ITransaction = {
            transactionId: Math.random().toString(36).substring(2, 9),
            transactionType: "expense",
            transactionValue: data.expenseValue,
            transactionDescription: data.expenseDescription
        }

        expenseReset()
        setBalanceValue(balanceValue - data.expenseValue)
        setTransaction(oldState => [newTransaction, ...oldState])    
}

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className='text-4xl font-bold text-sky-500 text-center'>MONEYFLOW</h1>

                <div className="relative flex gap-5 items-center justify-center">
                    <h1 className='text-4xl font-bold text-white text-center'>Saldo Atual:</h1>
                    <h1 className='text-4xl font-bold text-sky-500 text-center'>R$ {balanceValue}</h1>
                    
                    <GoHistory className="mt-1 cursor-pointer text-white size-5 hover:text-sky-400 transition" onClick={toggleModal}/>

                    <div className={`absolute top-12 left-0 z-50 bg-slate-800/95 border border-slate-700 rounded-xl p-5 pt-8 min-w-80 max-w-250 flex flex-col gap-1 transition-all duration-200 ${isModalOpen ? "flex opacity-100" : "hidden opacity-0"}`}>
                        <span className='absolute right-3 top-3 border rounded border-slate-600 text-slate-500 hover:border-red-700 hover:text-red-700 hover:scale-110 cursor-pointer transition-all duration-100' onClick={() => toggleModal()}><IoClose/></span>

                        <h1 className="font-bold text-center text-[1.2rem] mb-3 text-white">Histórico de Transações</h1>
                        {
                            allTransactions.map((transaction) => (
                            <div key={transaction.transactionId} className='flex gap-5 items-center justify-between cursor-default'>
                                <span className='text-slate-400 text-sm'>{transaction.transactionDescription}</span>
                                {
                                    transaction.transactionType === "income" ? (
                                        <div className='flex items-center justify-end gap-2 text-sm whitespace-nowrap text-green-500'>
                                            <span>+ {transaction.transactionValue}</span>
                                            <span className="flex justify-center items-center border scale-70 rounded-xl px-2 py-2 text-green-500">
                                                <FaArrowUp />
                                            </span>
                                        </div>
                                     ) : (
                                        <div className='flex items-center justify-end gap-2 text-sm whitespace-nowrap text-red-500'>
                                            <span>- {transaction.transactionValue}</span>
                                            <span className="flex justify-center items-center border scale-70 rounded-xl px-2 py-2 text-red-500">
                                                <FaArrowDown />
                                            </span>
                                        </div>
                                     )
                                }
                            </div>
                            ))
                        }
                    </div>
                </div>

                <form onSubmit={incomeHandleSubmit(incomeSubmit)} className="flex flex-col items-end gap-5">
                    <h1 className='text-2xl font-bold text-white text-left w-full pl-3 pb-3'>Entradas</h1>
                    <div className="flex gap-10">
                        <div className="relative">
                            <label htmlFor="incomeDescription" className="absolute -top-5 left-3 text-[0.8rem]">Descrição da Entrada</label>
                            <input type="text" placeholder="..." id="incomeDescription" {...incomeRegister("incomeDescription")} className="border bg-slate-800/80 border-slate-700 rounded-xl w-100 px-5 py-1 outline-0"/>
                            <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"></span>
                        </div>
                        <div className="relative">
                            <label htmlFor="incomeValue" className="absolute -top-5 left-3 text-[0.8rem]">Valor da Entrada</label>
                            <input type="text" placeholder="R$" id="incomeValue" {...incomeRegister("incomeValue", { valueAsNumber: true })} className="border bg-slate-800/80 border-slate-700 rounded-xl w-50 px-5 py-1 outline-0"/>
                            { incomeErrors.incomeValue && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]">{incomeErrors.incomeValue.message}</span>}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-green-400 hover:border-green-400 transition-all duration-100" type="submit">Enviar</button>
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-100" type="reset">Limpar</button>
                    </div>
                </form>

                <form onSubmit={expenseHandleSubmit(expenseSubmit)} className="flex flex-col items-end gap-5">
                    <h1 className='text-2xl font-bold text-white text-left w-full pl-3 pb-3'>Saídas</h1>
                    <div className="flex gap-10">
                        <div className="relative">
                            <label htmlFor="expenseDescription" className="absolute -top-5 left-3 text-[0.8rem]">Descrição da Saída</label>
                            <input type="text" placeholder="..." id="expenseDescription" {...expenseRegister("expenseDescription")} className="border bg-slate-800/80 border-slate-700 rounded-xl w-100 px-5 py-1 outline-0"/>
                            <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"></span>
                        </div>
                        <div className="relative">
                            <label htmlFor="expenseValue" className="absolute -top-5 left-3 text-[0.8rem]">Valor da Saída</label>
                            <input type="text" placeholder="R$" id="expenseValue" {...expenseRegister("expenseValue", { valueAsNumber: true })} className="border bg-slate-800/80 border-slate-700 rounded-xl w-50 px-5 py-1 outline-0"/>
                            {expenseErrors.expenseValue && <span className="absolute -bottom-4 left-2 text-red-700 text-[0.75rem]"> {expenseErrors.expenseValue.message}</span>}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-green-400 hover:border-green-400 transition-all duration-100" type="submit">Enviar</button>
                        <button className="border border-slate-700 rounded-xl px-5 py-1 cursor-pointer hover:text-red-500 hover:border-red-500 transition-all duration-100" type="reset">Limpar</button>
                    </div>
                </form>
            </div>
        </>
    )
}