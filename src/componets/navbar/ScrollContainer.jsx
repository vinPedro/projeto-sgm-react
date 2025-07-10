function ScrollContainer({children}){
    return(
        <ul className='flex flex-row w-[90vw] min-w-[375px] overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200'>
            {children}
        </ul>
    )
}

export default ScrollContainer