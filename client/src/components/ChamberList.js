export default function ChamberList({chambers}){
    return (
        <table className="w-full">
            <thead className="bg-slate-400 text-white">
                <td className="text-center p-2">Sl</td>
                <td className="">Vanue</td>
                <td className="text-center">Location</td>
                <td className="text-center">Day</td>
                <td className="text-center">Start Time</td>
                <td className="text-center">End Time</td>
            </thead>
            <tbody>
                {
                    chambers.map((chamber,i) => 
                        <tr key={chamber.id} className='border-b'>
                            <td className="text-center p-2">{i+1}</td>
                            <td>{chamber.vanue}</td>
                            <td>{chamber.location}</td>
                            <td className="text-center">{chamber.day}</td>
                            <td className="text-center">{chamber.from}</td>
                            <td className="text-center">{chamber.to}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}