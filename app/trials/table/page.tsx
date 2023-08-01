
import React from 'react'

//https://stackoverflow.com/questions/52737398/how-do-i-do-a-bootstrap-responsive-table-inside-another-table

const TablePage = () => {
    return (
        <div>
            <table className="table table-responsive table-hover">
                <thead>
                    <tr>
                        <th>Column</th>
                        <th>Column</th>
                        <th>Column</th>
                        <th>Column</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><i className="fa fa-plus" aria-hidden="true"></i></td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>- child row</td>
                        <td>data 1</td>
                        <td>data 1</td>
                        <td>data 1</td>
                    </tr>
                    <tr>
                        <td>- child row</td>
                        <td>data 1</td>
                        <td>data 1</td>
                        <td>data 1</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td><i className="fa fa-plus" aria-hidden="true"></i></td>
                        <td>data</td>
                        <td>data</td>
                        <td>data</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>- child row</td>
                        <td>data 2</td>
                        <td>data 2</td>
                        <td>data 2</td>
                    </tr>
                    <tr>
                        <td>- child row</td>
                        <td>data 2</td>
                        <td>data 2</td>
                        <td>data 2</td>
                    </tr>
                </tbody>
            </table>

            <h2>multi columns and rows</h2>
            <table className="datatable table-striped table-bordered">
                <thead>
                    <tr>

                        <th rowSpan={2}>ID</th>
                        <th rowSpan={2}> Name of the Liquidated Society</th>
                        <th rowSpan={2}>Jurisdiction of the Society</th>
                        <th rowSpan={2}>Liquidation Order No & Date</th>
                        <th rowSpan={2}>Name & Designation of Liquidator</th>
                        <th className='text-center' colSpan={6}>In the Liquidated Society</th>
                        <th rowSpan={2}>Update</th>
                        <th rowSpan={2}>Delete</th>
                    </tr>
                    <tr>
                        <th>Govt Share</th>
                        <th>Govt Loan</th>
                        <th>Assets to be recovered</th>
                        <th>Liability to be discharged </th>
                        <th>Cancellation Order Number and Date </th>
                        <th> Surplus amount remitted to CDF</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan={2}>1</td>
                        <td rowSpan={2}> name</td>
                        <td rowSpan={2}>Korea</td>
                        <td rowSpan={2}>1 </td>
                        <td rowSpan={2}>J and Seoul</td>
                        <td className='text-center' colSpan={6}>value of it</td>
                        <td rowSpan={2}>fdaf</td>
                        <td rowSpan={2}>fadfa</td>
                    </tr>
                    <tr>
                        <td>fdsafda</td>
                        <td>fdfdafda</td>
                        <td>fdfa</td>
                        <td>fdfdas </td>
                        <td>fdasfsa </td>
                        <td> dfdsa</td>

                    </tr>
                    <tr>
                        <td rowSpan={2}>1</td>
                        <td rowSpan={2}> name</td>
                        <td rowSpan={2}>Korea</td>
                        <td rowSpan={2}>1 </td>
                        <td rowSpan={2}>J and Seoul</td>
                        <td className='text-center' colSpan={6}>value of it</td>
                        <td rowSpan={2}>fdaf</td>
                        <td rowSpan={2}>fadfa</td>
                    </tr>
                    <tr>
                        <td>fdsafda</td>
                        <td>fdfdafda</td>
                        <td>fdfa</td>
                        <td>fdfdas </td>
                        <td>fdasfsa </td>
                        <td> dfdsa</td>

                    </tr>
                    <tr>
                        <td rowSpan={2}>1</td>
                        <td rowSpan={2}> name</td>
                        <td rowSpan={2}>Korea</td>
                        <td rowSpan={2}>1 </td>
                        <td rowSpan={2}>J and Seoul</td>
                        <td className='text-center' colSpan={6}>value of it</td>
                        <td rowSpan={2}>fdaf</td>
                        <td rowSpan={2}>fadfa</td>
                    </tr>
                    <tr>
                        <td>fdsafda</td>
                        <td>fdfdafda</td>
                        <td>fdfa</td>
                        <td>fdfdas </td>
                        <td>fdasfsa </td>
                        <td> dfdsa</td>

                    </tr>
                </tbody>

            </table>
        </div>
    )
}

export default TablePage