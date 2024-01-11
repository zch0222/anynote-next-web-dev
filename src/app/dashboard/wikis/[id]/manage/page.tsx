
export default function MangeWiki({params}: {
    params: {
        id: number
    }
}) {
    return (
        <div className="overflow-y-auto">{params.id}</div>
    )
}
