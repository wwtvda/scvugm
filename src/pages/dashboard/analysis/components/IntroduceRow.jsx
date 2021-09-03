import { InfoCircleOutlined } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import styles from '../style.less';
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

const IntroduceRow = ({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Total Konfirmasi"
        action={
          <Tooltip title="Seseorang yang dinyatakan positif terinfeksi COVID-19 yang
          dibuktikan dengan pemeriksaan RT-PCR di UGM">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => 1422}
        footer={<Field label="Kasus Harian" value={`${numeral(12423).format('0,0')}`} />}
        contentHeight={46}
      >
        <Trend
          flag="up"
          style={{
            marginRight: 16,
          }}
        >
          Mingguan
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          Bulanan
          <span className={styles.trendText}>11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Pasien Baciro Hari ini"
        action={
          <Tooltip title="Jumlah civitas yang melakukan isolasi di Asrama Darmaputera Baciro selama 14 Hari">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="Total Pasien di Baciro" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          color="#975FE4"
          xField="x"
          height={46}
          forceFit
          yField="y"
          smooth
          data={visitData}
        />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Suspek"
        action={
          <Tooltip title="Seseorang dengan gejala COVID-19 tetapi belum melakukan tes RT-PCR">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={<Field label="Bulanan" value="50%" />}
        contentHeight={46}
      >
        <TinyColumn xField="x" height={46} forceFit yField="y" data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="Vaksinasi Civitas UGM"
        action={
          <Tooltip title="Jumlah civitas yang telah divaksin">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total="78%"
        footer={
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <Trend
              style={{
                marginRight: 3,
              }}
            >
              Pelaksanaan
              <span className={styles.trendText}>12</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={0.78}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
