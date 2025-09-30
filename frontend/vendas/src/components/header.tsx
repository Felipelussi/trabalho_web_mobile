export function Header({title, button}: { title: string, button?: React.ReactNode}) {
    return <header className={"flex w-full justify-between items-center"}>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {button}
    </header>
}
