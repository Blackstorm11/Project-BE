import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.FirstName}</th>
            <th>{individualExcelData.LastName}</th>
            <th>{individualExcelData.GithubUsername}</th>
            <th>{individualExcelData.OfficeEmail}</th>
        </>
    )
}