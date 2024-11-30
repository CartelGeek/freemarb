import {
  Typography,
  Card,
  Row,
  Col,
  Table,
  Button,
  Alert,
  Statistic,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AnalyticsPage() {
  const { organizationId } = useParams()

  // Fetch agents data
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { organizationId },
    include: { messages: true },
  })

  // Fetch messages data
  const { data: messages } = Api.message.findMany.useQuery({
    where: { organizationId },
    include: { agent: true },
  })

  // Calculate metrics
  const totalMessages = messages?.length || 0
  const activeAgents = agents?.filter(a => a.status === 'ACTIVE')?.length || 0
  const averageMessagesPerAgent = totalMessages / (activeAgents || 1)

  const messageColumns = [
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
      render: (agent: any) => agent?.name,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const handleExport = () => {
    const csvContent = [
      ['Agent', 'Type', 'Status', 'Date'],
      ...(messages?.map(m => [
        m.agent?.name,
        m.type,
        m.status,
        dayjs(m.createdAt).format('YYYY-MM-DD HH:mm'),
      ]) || []),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'analytics-report.csv'
    a.click()
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Analytics Dashboard
        </Title>
        <Text type="secondary">
          Monitor your agents' performance and message processing metrics
        </Text>

        <Alert
          message="Custom Monitoring Alert"
          description="Set up alerts to monitor agent performance and message volumes"
          type="info"
          showIcon
          style={{ marginTop: '24px', marginBottom: '24px' }}
        />

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Total Messages"
                value={totalMessages}
                prefix={<i className="las la-envelope"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Active Agents"
                value={activeAgents}
                prefix={<i className="las la-robot"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Avg Messages/Agent"
                value={averageMessagesPerAgent.toFixed(2)}
                prefix={<i className="las la-calculator"></i>}
              />
            </Card>
          </Col>
        </Row>

        <Card
          title={
            <span>
              <i className="las la-table" style={{ marginRight: '8px' }}></i>
              Message Processing Details
            </span>
          }
          extra={
            <Button
              type="primary"
              onClick={handleExport}
              icon={<i className="las la-download"></i>}
            >
              Export Report
            </Button>
          }
          style={{ marginTop: '24px' }}
        >
          <Table
            dataSource={messages}
            columns={messageColumns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
