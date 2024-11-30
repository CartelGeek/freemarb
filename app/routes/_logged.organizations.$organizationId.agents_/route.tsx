import {
  Typography,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AgentsPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch agents and templates
  const { data: agents, refetch: refetchAgents } = Api.agent.findMany.useQuery({
    where: { organizationId },
    include: { template: true, integrations: true },
  })

  const { data: templates } = Api.template.findMany.useQuery({
    where: { organizationId },
  })

  // Mutations
  const { mutateAsync: createAgent } = Api.agent.create.useMutation()

  const handleCreateAgent = async (values: any) => {
    try {
      await createAgent({
        data: {
          name: values.name,
          language: values.language,
          timezone: values.timezone,
          templateId: values.templateId,
          organizationId,
          status: 'ACTIVE',
        },
      })
      setIsCreateModalOpen(false)
      form.resetFields()
      refetchAgents()
    } catch (error) {
      console.error('Error creating agent:', error)
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a
          onClick={() =>
            navigate(`/organizations/${organizationId}/agents/${record.id}`)
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: 'Template',
      dataIndex: ['template', 'name'],
      key: 'template',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Timezone',
      dataIndex: 'timezone',
      key: 'timezone',
    },
    {
      title: 'WhatsApp',
      key: 'whatsapp',
      render: (record: any) => {
        const hasWhatsApp = record.integrations?.some(
          (i: any) => i.type === 'WHATSAPP',
        )
        return hasWhatsApp ? (
          <Tag color="green">
            <i className="las la-check"></i> Connected
          </Tag>
        ) : (
          <Tag color="red">
            <i className="las la-times"></i> Not Connected
          </Tag>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
  ]

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
              <i className="las la-robot"></i> AI Agents
            </Title>
            <Text type="secondary">
              Manage your AI agents and their configurations
            </Text>
          </div>
          <Button
            type="primary"
            icon={<i className="las la-plus"></i>}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create Agent
          </Button>
        </div>

        <Card>
          <Table
            dataSource={agents}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Create New Agent"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateAgent}>
            <Form.Item
              name="name"
              label="Agent Name"
              rules={[{ required: true, message: 'Please input agent name!' }]}
            >
              <Input prefix={<i className="las la-robot"></i>} />
            </Form.Item>

            <Form.Item
              name="templateId"
              label="Template"
              rules={[{ required: true, message: 'Please select a template!' }]}
            >
              <Select>
                {templates?.map(template => (
                  <Select.Option key={template.id} value={template.id}>
                    {template.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              rules={[{ required: true, message: 'Please select a language!' }]}
            >
              <Select>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="es">Spanish</Select.Option>
                <Select.Option value="fr">French</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="timezone"
              label="Timezone"
              rules={[{ required: true, message: 'Please select a timezone!' }]}
            >
              <Select>
                <Select.Option value="UTC">UTC</Select.Option>
                <Select.Option value="EST">EST</Select.Option>
                <Select.Option value="PST">PST</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Create Agent
                </Button>
                <Button onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
