export function Footer(){

    return(
        <footer className="fixed bottom-0 w-full py-2 text-center bg-slate-800 border-t border-slate-700">
            <div className="px-6 flex items-center justify-evenly">
                
                <p className="text-slate-400 text-sm">
                    © {new Date().getFullYear()} UsefulToolsPortal |  Rio Pomba Valley | Todos os direitos reservados.
                </p>

                <div className="flex items-center gap-6">
                    <span className="text-slate-500 text-sm">
                        Feito por <span className="text-sky-400 font-medium">Renan Felliphe</span>
                    </span>

                    <a href="https://instagram.com/renan_felliphe11" target="_blank"
                        className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                        Instagram
                    </a>
                    
                    <a href="https://www.linkedin.com/in/renan-felliphe-moura-34ab1126a/" target="_blank"
                        className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-sm">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    )
}