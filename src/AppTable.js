import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import './App.css';

import {useQuery} from "@apollo/client";
import NEWS from "./queries";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    const firstPageRows = rows

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {firstPageRows.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )}
                )}
                </tbody>
            </table>
            <br />
        </>
    )
}

function App() {

    const columns = React.useMemo(
        () => [
            {
                Header: 'All scrapped news',
                columns: [
                    {
                        Header: 'Id',
                        accessor: 'id',
                    },
                    {
                        Header: 'Title',
                        accessor: 'title',
                    },
                    {
                        Header: 'Author',
                        accessor: 'author',
                    },
                    {
                        Header: 'Views',
                        accessor: 'views',
                    },
                    {
                        Header: 'Publish Date',
                        accessor: 'publishDate',
                    }
                ],
            },
        ],
        []
    )

    const {loading, error, data} = useQuery(NEWS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <Styles>
            <Table columns={columns} data={data.news} />
        </Styles>
    )
}

export default App
