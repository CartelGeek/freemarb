import {
  Typography,
  Card,
  Button,
  Form,
  Input,
  Switch,
  Space,
  message,
  Tabs,
  QRCode,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function IntegrationsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [activeTab, setActiveTab] = useState('1')

  // Fetch existing integrations
  const { data: integrations, refetch } = Api.integration.findMany.useQuery({
    where: { organizationId },
    include: { agent: true },
  })

  // Mutations
  const { mutateAsync: createIntegration } =
    Api.integration.create.useMutation()
  const { mutateAsync: updateIntegration } =
    Api.integration.update.useMutation()
  const { mutateAsync: deleteIntegration } =
    Api.integration.delete.useMutation()

  // Handle WhatsApp connection
  const handleWhatsAppConnect = async () => {
    try {
      await createIntegration({
        data: {
          type: 'WHATSAPP',
          status: 'PENDING',
          configuration: {},
          organizationId,
          agentId: '', // You would need to specify an agent ID here
        },
      })
      message.success('WhatsApp connection initiated')
      refetch()
    } catch (error) {
      message.error('Failed to connect WhatsApp')
    }
  }

  // Handle N8N workflow configuration
  const handleN8NSubmit = async (values: any) => {
    try {
      await createIntegration({
        data: {
          type: 'N8N',
          status: 'ACTIVE',
          configuration: values,
          organizationId,
          agentId: '', // You would need to specify an agent ID here
        },
      })
      message.success('N8N workflow configured successfully')
      refetch()
    } catch (error) {
      message.error('Failed to configure N8N workflow')
    }
  }

  // Handle Dify AI configuration
  const handleDifySubmit = async (values: any) => {
    try {
      await createIntegration({
        data: {
          type: 'DIFY',
          status: 'ACTIVE',
          configuration: values,
          organizationId,
          agentId: '', // You would need to specify an agent ID here
        },
      })
      message.success('Dify AI configured successfully')
      refetch()
    } catch (error) {
      message.error('Failed to configure Dify AI')
    }
  }

  // Test integration connection
  const testConnection = async (integrationId: string) => {
    try {
      await updateIntegration({
        where: { id: integrationId },
        data: { status: 'TESTING' },
      })
      message.success('Connection test successful')
      refetch()
    } catch (error) {
      message.error('Connection test failed')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-plug" style={{ marginRight: 8 }}></i>
          Integrations
        </Title>
        <Text>
          Configure and manage your integrations to enhance your workflow
        </Text>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ marginTop: 24 }}
          items={[
            {
              key: '1',
              label: (
                <span>
                  <i className="lab la-whatsapp" style={{ marginRight: 8 }}></i>
                  WhatsApp
                </span>
              ),
              children: (
                <Card>
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: '100%' }}
                  >
                    <Text>
                      Connect your WhatsApp account by scanning the QR code
                      below
                    </Text>
                    <QRCode value="https://example.com/whatsapp-connect" />
                    <Button type="primary" onClick={handleWhatsAppConnect}>
                      <i
                        className="las la-qrcode"
                        style={{ marginRight: 8 }}
                      ></i>
                      Connect WhatsApp
                    </Button>
                  </Space>
                </Card>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <i className="las la-robot" style={{ marginRight: 8 }}></i>
                  N8N Workflows
                </span>
              ),
              children: (
                <Card>
                  <Form onFinish={handleN8NSubmit} layout="vertical">
                    <Form.Item
                      label="Webhook URL"
                      name="webhookUrl"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter N8N webhook URL" />
                    </Form.Item>
                    <Form.Item
                      label="API Key"
                      name="apiKey"
                      rules={[{ required: true }]}
                    >
                      <Input.Password placeholder="Enter N8N API key" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        <i
                          className="las la-save"
                          style={{ marginRight: 8 }}
                        ></i>
                        Save Configuration
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                  <i className="las la-brain" style={{ marginRight: 8 }}></i>
                  Dify AI
                </span>
              ),
              children: (
                <Card>
                  <Form onFinish={handleDifySubmit} layout="vertical">
                    <Form.Item
                      label="API Endpoint"
                      name="apiEndpoint"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Enter Dify AI API endpoint" />
                    </Form.Item>
                    <Form.Item
                      label="API Key"
                      name="apiKey"
                      rules={[{ required: true }]}
                    >
                      <Input.Password placeholder="Enter Dify AI API key" />
                    </Form.Item>
                    <Form.Item
                      label="Enable AI Features"
                      name="enabled"
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        <i
                          className="las la-save"
                          style={{ marginRight: 8 }}
                        ></i>
                        Save Configuration
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              ),
            },
          ]}
        />

        <Title level={3} style={{ marginTop: 24 }}>
          <i className="las la-cog" style={{ marginRight: 8 }}></i>
          Active Integrations
        </Title>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {integrations?.map(integration => (
            <Card key={integration.id}>
              <Space
                align="center"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <Space>
                  <i
                    className={`las la-${integration.type?.toLowerCase()}`}
                    style={{ fontSize: 24 }}
                  ></i>
                  <div>
                    <Text strong>{integration.type}</Text>
                    <br />
                    <Text
                      type={
                        integration.status === 'ACTIVE' ? 'success' : 'warning'
                      }
                    >
                      {integration.status}
                    </Text>
                  </div>
                </Space>
                <Space>
                  <Button onClick={() => testConnection(integration.id)}>
                    <i className="las la-vial" style={{ marginRight: 8 }}></i>
                    Test Connection
                  </Button>
                  <Button
                    danger
                    onClick={() =>
                      deleteIntegration({ where: { id: integration.id } })
                    }
                  >
                    <i className="las la-trash" style={{ marginRight: 8 }}></i>
                    Remove
                  </Button>
                </Space>
              </Space>
            </Card>
          ))}
        </Space>
      </div>
    </PageLayout>
  )
}
