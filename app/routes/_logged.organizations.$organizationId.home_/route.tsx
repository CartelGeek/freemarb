import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Space,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()

  // Fetch agents data with messages included
  const { data: agents } = Api.agent.findMany.useQuery({
    where: { organizationId },
    include: { messages: true },
  })

  // Fetch recent messages
  const { data: recentMessages } = Api.message.findMany.useQuery({
    where: { organizationId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { agent: true },
  })

  // Calculate statistics
  const totalAgents = agents?.length || 0
  const activeAgents =
    agents?.filter(agent => agent.status === 'ACTIVE')?.length || 0
  const totalMessages =
    agents?.reduce((acc, agent) => acc + (agent.messages?.length || 0), 0) || 0
  const successRate =
    agents?.reduce((acc, agent) => {
      const successMessages =
        agent.messages?.filter(m => m.status === 'SUCCESS')?.length || 0
      const totalAgentMessages = agent.messages?.length || 0
      return (
        acc +
        (totalAgentMessages > 0
          ? (successMessages / totalAgentMessages) * 100
          : 0)
      )
    }, 0) / (totalAgents || 1)

  const columns = [
    {
      title: 'Agent',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Text type={status === 'ACTIVE' ? 'success' : 'secondary'}>
          <i
            className={`las ${
              status === 'ACTIVE' ? 'la-check-circle' : 'la-pause-circle'
            }`}
          ></i>{' '}
          {status}
        </Text>
      ),
    },
    {
      title: 'Messages Processed',
      key: 'messages',
      render: (record: any) => record.messages?.length.toString() || '0',
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button
            type="primary"
            icon={<i className="las la-eye"></i>}
            onClick={() =>
              navigate(`/organizations/${organizationId}/agents/${record.id}`)
            }
          >
            View
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-robot"></i> Agent Dashboard
        </Title>
        <Text type="secondary">
          Monitor your agents' performance and activity in real-time
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Agents"
                value={totalAgents}
                prefix={<i className="las la-users"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Agents"
                value={activeAgents}
                prefix={<i className="las la-user-check"></i>}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Messages Processed"
                value={totalMessages}
                prefix={<i className="las la-envelope"></i>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Success Rate"
                value={successRate}
                precision={2}
                suffix="%"
                prefix={<i className="las la-chart-line"></i>}
                valueStyle={{ color: successRate > 80 ? '#3f8600' : '#cf1322' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-table"></i> Agent Performance
                </>
              }
            >
              <Table
                dataSource={agents}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-history"></i> Recent Activities
                </>
              }
            >
              {recentMessages?.map(message => (
                <div key={message.id} style={{ marginBottom: '12px' }}>
                  <Text>
                    <i className="las la-robot"></i> {message.agent?.name} -{' '}
                    {message.content}
                  </Text>
                  <br />
                  <Text type="secondary">
                    {dayjs(message.createdAt).format('MMM D, YYYY HH:mm')}
                  </Text>
                </div>
              ))}
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
