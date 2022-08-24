// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Demo Components
import TableAdvSearch from './Table';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ProductTable = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Datatables Advance' data={[{ title: 'Datatables' }, { title: 'Datatables Advance' }]} />
      <Row>
        <Col sm='12'>
          <TableAdvSearch />
        </Col>
      </Row>
    </Fragment>
  )
}

export default ProductTable
