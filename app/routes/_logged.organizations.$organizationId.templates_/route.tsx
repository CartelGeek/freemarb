import {
  Typography,
  Card,
  Row,
  Col,
  Select,
  Empty,
  Button,
  Tag,
  Spin,
} from 'antd'
const { Title, Text, Paragraph } = Typography
import { useState } from 'react'
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TemplatesPage() {
  const { organizationId } = useParams()
  const navigate = useNavigate()

  // Fetch templates with organization included
  const { data: templates, isLoading } = Api.template.findMany.useQuery({
    where: { organizationId },
    include: { organization: true },
  })

  // Create mutation at component top level
  const { mutateAsync: createAgent } = Api.agent.create.useMutation()

  // State for category filter
  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Filter unique template types
  const templateTypes = Array.from(new Set(templates?.map(t => t.type))).filter(
    Boolean,
  ) as string[]

  // Filter templates based on selected type
  const filteredTemplates = templates?.filter(
    template => !selectedType || template.type === selectedType,
  )

  const handleTemplateSelect = async (templateId: string) => {
    try {
      await createAgent({
        data: {
          name: 'New Agent',
          templateId,
          organizationId: organizationId!,
        },
      })
      navigate(`/organizations/${organizationId}/agents`)
    } catch (error) {
      console.error('Error creating agent:', error)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-robot" style={{ marginRight: 8 }}></i>
            AI Agent Templates
          </Title>
          <Paragraph>
            Browse and select from our collection of pre-built AI agent
            templates to quickly create specialized agents for your needs.
          </Paragraph>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Select
            style={{ width: 200 }}
            placeholder="Filter by type"
            allowClear
            onChange={value => setSelectedType(value)}
          >
            {templateTypes?.map(type => (
              <Select.Option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : filteredTemplates?.length ? (
          <Row gutter={[16, 16]}>
            {filteredTemplates?.map(template => (
              <Col xs={24} sm={12} md={8} lg={6} key={template.id}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  actions={[
                    <Button
                      type="primary"
                      onClick={() => handleTemplateSelect(template.id)}
                      icon={<i className="las la-plus"></i>}
                    >
                      Use Template
                    </Button>,
                  ]}
                >
                  <div style={{ marginBottom: 16 }}>
                    <i
                      className={`las ${
                        template.type === 'transcription'
                          ? 'la-file-audio'
                          : template.type === 'sales'
                          ? 'la-dollar-sign'
                          : template.type === 'support'
                          ? 'la-headset'
                          : 'la-robot'
                      }`}
                      style={{ fontSize: 24, marginRight: 8 }}
                    ></i>
                    <Title level={4} style={{ marginTop: 8 }}>
                      {template.name}
                    </Title>
                  </div>

                  {template.type && (
                    <Tag color="blue" style={{ marginBottom: 8 }}>
                      {template.type}
                    </Tag>
                  )}

                  {template.category && (
                    <Tag color="green" style={{ marginBottom: 8 }}>
                      {template.category}
                    </Tag>
                  )}

                  <Paragraph ellipsis={{ rows: 3 }}>
                    {template.description || 'No description available'}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="No templates found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </PageLayout>
  )
}
