import React, { useState } from 'react'

const ViewTable = () => {
    const [local_data, setLocalData] = useState(JSON.parse(localStorage.getItem('local_data')));
    const handleDelete = (e) =>  {
        const temp = local_data;
        const updated_data = temp.filter((d, i) => String(i) !== String(e.target.id));
        setLocalData(updated_data);
        localStorage.setItem('local_data', JSON.stringify(updated_data));
    }
  return (
    <div className='table-container'>
        {local_data !== null && <table className='view-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    {Object.entries(local_data[0]).map((d, i) => (
                        <th key={i}>{d[0]}</th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {local_data.map((data, i) => (
                    <tr key={i}>
                        <td>
                            {i+1}
                        </td>
                        {Object.entries(data).map((d, i) => (
                            <td key={i}>{d[1]}</td>
                        ))}
                        <td>
                            <button id={i} onClick={handleDelete} >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>}
    </div>
  )
}

export default ViewTable