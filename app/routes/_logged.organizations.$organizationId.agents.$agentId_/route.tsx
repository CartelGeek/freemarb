import {
  Typography,
  Card,
  Switch,
  Button,
  Tabs,
  Statistic,
  Form,
  Input,
  Select,
  Space,
  message,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentDetailsPage() {
  const { organizationId, agentId } = useParams()
  const { organization } = useUserContext()
  const [form] = Form.useForm()

  // Fetch agent data with related template and integrations
  const {
    data: agent,
    isLoading,
    refetch,
  } = Api.agent.findFirst.useQuery({
    where: { id: agentId },
    include: {
      template: true,
      integrations: true,
      messages: true,
    },
  })

  // Mutations
  const { mutateAsync: updateAgent } = Api.agent.update.useMutation()
  const { mutateAsync: createIntegration } =
    Api.integration.create.useMutation()
  const { mutateAsync: deleteIntegration } =
    Api.integration.delete.useMutation()

  // Handle agent status toggle
  const handleStatusToggle = async (checked: boolean) => {
    try {
      await updateAgent({
        where: { id: agentId },
        data: { status: checked ? 'ACTIVE' : 'PAUSED' },
      })
      message.success(`Agent ${checked ? 'activated' : 'paused'} successfully`)
      refetch()
    } catch (error) {
      message.error('Failed to update agent status')
    }
  }

  // Handle configuration update
  const handleConfigUpdate = async (values: any) => {
    try {
      await updateAgent({
        where: { id: agentId },
        data: {
          name: values.name,
          language: values.language,
          timezone: values.timezone,
          configuration: values.configuration,
        },
      })
      message.success('Agent configuration updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update configuration')
    }
  }

  // Calculate success rate
  const successRate = agent?.messages?.length
    ? (
        (agent.messages.filter(m => m.status === 'SUCCESS').length /
          agent.messages.length) *
        100
      ).toFixed(1)
    : '0'

  if (isLoading) {
    return <PageLayout layout="full-width">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <Title level={2}>
              <i className="las la-robot" style={{ marginRight: 8 }}></i>
              {agent?.name}
            </Title>
            <Text type="secondary">Template: {agent?.template?.name}</Text>
          </div>
          <Space>
            <Text>Status:</Text>
            <Switch
              checked={agent?.status === 'ACTIVE'}
              onChange={handleStatusToggle}
              checkedChildren={<i className="las la-play"></i>}
              unCheckedChildren={<i className="las la-pause"></i>}
            />
          </Space>
        </div>

        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-chart-bar"></i> Performance
              </span>
            }
            key="1"
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              <Card>
                <Statistic
                  title="Success Rate"
                  value={successRate}
                  suffix="%"
                  prefix={<i className="las la-percentage"></i>}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Messages"
                  value={agent?.messages?.length || 0}
                  prefix={<i className="las la-comments"></i>}
                />
              </Card>
              <Card>
                <Statistic
                  title="Active Since"
                  value={dayjs(agent?.createdAt).format('MMM D, YYYY')}
                  prefix={<i className="las la-calendar"></i>}
                />
              </Card>
            </div>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-cog"></i> Configuration
              </span>
            }
            key="2"
          >
            <Card>
              <Form
                form={form}
                layout="vertical"
                initialValues={agent}
                onFinish={handleConfigUpdate}
              >
                <Form.Item name="name" label="Agent Name">
                  <Input />
                </Form.Item>
                <Form.Item name="language" label="Language">
                  <Select>
                    <Select.Option value="en">English</Select.Option>
                    <Select.Option value="es">Spanish</Select.Option>
                    <Select.Option value="fr">French</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="timezone" label="Timezone">
                  <Select>
                    <Select.Option value="UTC">UTC</Select.Option>
                    <Select.Option value="EST">EST</Select.Option>
                    <Select.Option value="PST">PST</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <span>
                <i className="las la-plug"></i> Integrations
              </span>
            }
            key="3"
          >
            <Card>
              {agent?.integrations?.map(integration => (
                <Card.Grid style={{ width: '33.33%' }} key={integration.id}>
                  <div style={{ textAlign: 'center' }}>
                    <i
                      className={`las la-${integration.type?.toLowerCase()}`}
                      style={{ fontSize: 32 }}
                    ></i>
                    <Title level={4}>{integration.type}</Title>
                    <Text type="secondary">Status: {integration.status}</Text>
                    <br />
                    <Button
                      danger
                      onClick={() =>
                        deleteIntegration({ where: { id: integration.id } })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Grid>
              ))}
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </PageLayout>
  )
}
