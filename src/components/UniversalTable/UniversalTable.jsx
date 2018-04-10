import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

const Style = {
  wrapper: 'universal-table',
  table:   'universal-table__table',
  header:  'universal-table__header',
  row:     'universal-table__table__row',
  column:  'universal-table__table__column',
}

class UniversalTable extends PureComponent {
  constructor() {
    super()
  }

  renderHeaders(headers) {
    return (
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header} className={Style.header}>{header}</th>
          ))}
        </tr>
      </thead>
    )
  }

  render() {
    const { headers, data, renderRow } = this.props

    return (
      <div className={Style.wrapper}>
        <table className={Style.table}>
          {this.renderHeaders(headers)}
          <tbody>
            {data.map(renderRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default UniversalTable

UniversalTable.propTypes = {
  /** */
  headers:   PropTypes.array,
  /** */
  data:      PropTypes.array,
  /** */
  renderRow: PropTypes.func,
}
