import React from 'react';
import type { ColumnProps } from './Column';
import styles from './styles.less';
import { Paper } from 'components/Paper';
import { sumBy, get } from 'lodash';

export type TableProps = {
  style: ?{ [descriptor: string]: number|string },
  children: { props: ColumnProps } | Array<{props: ColumnProps}>,
  data: Array<any>,
  name?: string,
  nullState?: string|React$Element<*>
};
export const Table = ({ name, children, data, style, tbstyle, nullState }: TableProps) => {
  if (!name) {
    name = `${Date.now()}.${Math.random()}`;
  }
  const rows = React.Children.toArray(children).filter((c) => !get(c.props, 'render', false));
  const columns = React.Children.toArray(children).filter((c) => get(c.props, 'render', false));
  const totalColumns = sumBy(columns, (c) => get(c, 'props.colSpan', 1));
  return (

    <div className={styles.Table}>
      { data.length || rows.length ? <table style={style} key={name}>
        <thead>
          <tr>
            {columns.map(
              ({ props }, colIndex) =>
                <th
                key={`${name}.${'header'}.${colIndex}`}
                style={{
                  width: (((props.colSpan || 1) / totalColumns) * 100) + '%',
                  ...props.style
                }}>
                  {props.name || `Column ${colIndex}`}
              </th>
            )}
          </tr>
        </thead>
        <tbody style={tbstyle}>
          {data.map(
            (rowData, rowIndex) => <tr key={`${name}.${rowIndex}`}>{columns.map(
              ({ props }, colIndex) => <td
                key={`${name}.${rowIndex}.${colIndex}`}
                className={props.className}
                style={{
                  width: (((props.colSpan || 1) / totalColumns) * 100) + '%',
                  ...props.style
                }}
                onClick={() => props.onClick && props.onClick(rowData)}>
                  {props.render(rowData, rowIndex + 1)}
                  </td>
            )}</tr>
          )}
          {rows.map(({ props, i }) => <tr key={`${name}.row.${i}`}><td colSpan={totalColumns + 1} style={{ width: '100%', overflow: 'visible' }}>{props.children}</td></tr>)}
        </tbody>
      </table> : <Paper>{(nullState || 'There is no data to display')}</Paper> }
    </div>
  );
}
