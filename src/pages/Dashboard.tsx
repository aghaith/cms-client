import { useQuery } from 'react-query';
import { getUsersPerMonth, getCampaignsPerMonth, getHeadersOverview} from 'api/services/dashboard.services';
import { UsersOverview, campaignsOverview, HeaderOverview } from 'interfaces/dashboard.model';
import Headers from "components/dashboard/headers/headers.component";
import { Col, Container, Row } from 'react-bootstrap';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  RadialLinearScale,
  Filler,
  BarElement
} from 'chart.js';
import { Pie, Line, Radar, Bar } from 'react-chartjs-2';
import { AxiosError } from 'interfaces/errors.model';
import { Controller, useForm } from 'react-hook-form';
import { DropDownOption } from 'interfaces/common.model';
import Select from 'react-select'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
  BarElement
);

const Dashboard = () => {

  const { control, getValues } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    data: dashboard,
  } = useQuery<
    HeaderOverview[],
    AxiosError
  >("dashboardOverview", getHeadersOverview, {
    refetchOnWindowFocus: false,
  });

  const {
    data: usersPerMonth,
  } = useQuery<
    UsersOverview[],
    AxiosError
  >("usersOverview", getUsersPerMonth, {
    refetchOnWindowFocus: false,
  });

  const {
    data: campaignsPerMonth,
    refetch
  } = useQuery<
    campaignsOverview[],
    AxiosError
  >(["campaignsOverview", getValues('type')], getCampaignsPerMonth, {
    refetchOnWindowFocus: false,
  });

  const pieData = {
    labels: dashboard?.map((item) => item?.key),
    datasets: [
      {
        label: '',
        data: dashboard?.map((item) => item?.value),
        backgroundColor: [
          '#E63D00',
          '#0ADC0A',
          '#36A2EB',
        ],
        borderColor: [
          '#E63D00',
          '#0ADC0A',
          '#36A2EB',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: usersPerMonth?.map((item) => item?.date),
    datasets: [
      {
        label: '',
        data: usersPerMonth?.map((item) => item?.value),
        fill: true,
        backgroundColor: '#FFCD56',
        borderColor: '#FFCD56'
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Users Per Month',
      },
    },
  };

  const radarChartData = {
    labels: campaignsPerMonth?.map((item) => item?.date),
    datasets: [
      {
        label: 'Campaigns Per Month',
        data: campaignsPerMonth?.map((item) => item?.value),
        backgroundColor: '#BF0000',
        borderColor: '#BF0000'
      }
    ]
  };

  const campaignTypes: DropDownOption[] = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'educational', label: 'Educational' },
    { value: 'governmental', label: 'Governmental' }
  ]

  const barChartData = {
    labels: campaignsPerMonth?.map(item => item?.date),
    datasets: [
      {
        label: '',
        backgroundColor: '#E72D80',
        borderColor: '#E72D80',
        borderWidth: 1,
        data: campaignsPerMonth?.map(item => item?.value)
      }
    ]
  }

  const barChartOptions = {
    plugins: {
      title: {
        display: true,
        text: 'Campaign Types Per Month'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return 'Total: ' + (context.parsed.y);
          },
        },
      },
    }
  }

  return (
    <>
      <section className="section">
        <Headers />
        <Container className='mt-3'>
          <Row className='align-items-center'>
            <Col>
              <Pie data={pieData} />
            </Col>
            <Col>
              <Line options={lineChartOptions} data={lineChartData} />
            </Col>
            <Col>
              <Radar data={radarChartData} />
            </Col>
          </Row>
          <Row>
            <Col>
              <form>
                <div className="form-group d-flex mt-3 align-items-center">
                  <label className="text-muted me-2">Type</label>
                  <Controller
                    control={control}
                    name="type"
                    render={({
                      field: { onChange, value },
                    }) => (
                      <Select
                        menuPlacement="auto"
                        options={campaignTypes}
                        isSearchable={true}
                        value={campaignTypes.find(opt => opt?.value === value) || null}
                        onChange={(val: DropDownOption) => {
                          onChange(val?.value);
                          refetch()
                        }}
                        isClearable={true}
                        className="w-55"
                      />
                    )}
                  />
                </div>
              </form>
              <Bar data={barChartData} options={barChartOptions} />
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Dashboard;
