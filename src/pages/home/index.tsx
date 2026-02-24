import { NavLink} from 'react-router-dom';

export function Home(){
    
    return (
        <>
        <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
            <div className='text-center flex flex-col gap-5'>
                <h1 className='text-4xl font-bold text-sky-500'>Bem-Vindo ao UsefulToolsPortal</h1>
                <h4 className='text-white'>Simplifique tarefas, encontre ferramentas que facilitam sua rotina e potencializam seus resultados, transformando a sua produtividade!</h4>
            </div>
                
            <div className="flex justify-evenly w-full my-30 px-20">
                <NavLink to={'/taskmaster'} className="w-80 bg-slate-800/80 flex flex-col gap-3 border border-slate-700 rounded-xl p-10 text-sky-500 cursor-pointer text-center transition-all duration-300 hover:shadow-[0_0_25px_5px_var(--color-sky-700)] hover:scale-105">
                    <h1 className="tracking-[2px] text-[1.5rem] font-semibold">TaskMaster</h1>
                    <p className="text-white text-justify">Transforme caos em organização. Registre, organize e acompanhe 
                        suas tarefas, defina prioridades e mantenha tudo sob controle em um só lugar.</p>
                </NavLink>
                <NavLink to={'/connecthub'} className="w-80 bg-slate-800/80 flex flex-col gap-3 border border-slate-700 rounded-xl p-10 text-sky-500 cursor-pointer text-center transition-all duration-300 hover:shadow-[0_0_25px_5px_var(--color-sky-700)] hover:scale-105">
                    <h1 className="tracking-[2px] text-[1.5rem] font-semibold">ConnectHub</h1>
                    <p className="text-white text-justify">Centralize seus contatos com praticidade e segurança. Cadastre, 
                        organize e tenha todas as informações importantes sempre à mão.</p>
                </NavLink>
                <NavLink to={'/moneyflow'} className="w-80 bg-slate-800/80 flex flex-col gap-3 border border-slate-700 rounded-xl p-10 text-sky-500 cursor-pointer text-center transition-all duration-300 hover:shadow-[0_0_25px_5px_var(--color-sky-700)] hover:scale-105">
                    <h1 className="tracking-[2px] text-[1.5rem] font-semibold">MoneyFlow</h1>
                    <p className="text-white text-justify">Controle da sua vida financeira de maneira prática. Registre suas 
                        entradas e saídas, visualize seu saldo total para tomar decisões mais inteligentes sobre seu dinheiro.</p>
                </NavLink>
            </div>
        </div>
            
        </>
    )
}