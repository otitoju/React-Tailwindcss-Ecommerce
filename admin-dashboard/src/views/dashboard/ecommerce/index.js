// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { useRTL } from '@hooks/useRTL'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Demo Components
import CompanyTable from './CompanyTable'
import Earnings from '@src/views/ui-elements/cards/analytics/Earnings'
import CardMedal from '@src/views/ui-elements/cards/advance/CardMedal'
import CardMeetup from '@src/views/ui-elements/cards/advance/CardMeetup'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import GoalOverview from '@src/views/ui-elements/cards/analytics/GoalOverview'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import CardTransactions from '@src/views/ui-elements/cards/advance/CardTransactions'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import CardBrowserStates from '@src/views/ui-elements/cards/advance/CardBrowserState'


// Charts
import ApexAreaChart from '../../charts/apex/ApexAreaCharts'
import LineChart from '../../charts/chart-js/ChartjsLineChart'
import ReChartLineChart from '../../charts/recharts/LineChart'
import RadarChart from '../../charts/chart-js/ChartjsRadarChart'
import PolarAreaChart from '../../charts/chart-js/ChartjsPolarAreaChart'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import 'chart.js/auto'

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors),
  { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    //tooltipShadow = 'rgba(0, 0, 0, 0.25)',
    lineChartPrimary = '#666ee8',
    lineChartDanger = '#ff4961',
    warningColorShade = '#ffbd1f',
    //warningLightColor = '#FDAC34',
    successColorShade = '#28dac6',
    //primaryColorShade = '#836AF9',
    infoColorShade = '#299AFF',
    yellowColor = '#ffe800',
    greyColor = '#4F5D70'
    // blueColor = '#2c9aff',
    // blueLightColor = '#84D0FF',
    // greyLightColor = '#EDF1F4'

  // ** vars
  // const trackBgColor = '#e9ecef'

  const [isRtl] = useRTL()

  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xl='4' md='6' xs='12'>
          <CardMedal />
        </Col>
        <Col xl='8' md='6' xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>

        <Col sm='12'>
          <ReChartLineChart warning={colors.warning.main} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col sm='12'>
          <ApexAreaChart direction={isRtl ? 'rtl' : 'ltr'} />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col sm='12'>
          <LineChart
            labelColor={labelColor}
            gridLineColor={gridLineColor}
            lineChartDanger={lineChartDanger}
            lineChartPrimary={lineChartPrimary}
            warningColorShade={warningColorShade}
          />
        </Col>
        <Col lg='6' sm='12'>
          <RadarChart labelColor={labelColor} gridLineColor={gridLineColor} />
        </Col>
        <Col lg='6' sm='12'>
          <PolarAreaChart
            greyColor={greyColor}
            labelColor={labelColor}
            yellowColor={yellowColor}
            primary={colors.primary.main}
            infoColorShade={infoColorShade}
            warningColorShade={warningColorShade}
            successColorShade={successColorShade}
          />
        </Col>
      </Row>

      {/* <Row className='match-height'>
      
      </Row> */}
      {/* <Row className='match-height'>
        
      </Row> */}
    </div>
  )
}

export default EcommerceDashboard
