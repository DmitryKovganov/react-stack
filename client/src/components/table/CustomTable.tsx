import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

export type CustomTableSettings = {
  columns: { 
    title: string; 
    align?: string
  }[]

  rows: { 
    modelKey: string; 
    align?: string;
    component?: string;
    scope?: string;
  }[]
}

export type CustomTableProps = {
    getData: () => Promise<Record<string, any>[]>;
    settings: CustomTableSettings;
}

export const CustomTable = forwardRef(function CustomTable(props: any, ref: any) {
  const [data, setData] = useState([]);

  const requestData = useCallback(() => {
    props.getData().then((data: any) => setData(data.payload));
  }, []);

  useEffect(() => {
    requestData();
  }, [requestData]);

  useImperativeHandle(ref, () => ({
    refresh: () => {
      requestData();
    }
  }));

  return (
    <TableContainer sx={{ display: 'flex', justifyContent: 'center' }} component={Paper}>
      <Table sx={{ width: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.settings.columns.map((column: any) => (
              <TableCell
                key={column.title} 
                align={column.align as any}>
                  {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any, i: number) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.settings.rows.map((row: any, j: number) => (
                <TableCell 
                  key={`${item[row.modelKey]}_${i}_${j}`}
                  align={row.align as any}
                  component={row.component as any}
                  scope={row.scope as any}>
                    {item[row.modelKey]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
