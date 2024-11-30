import { Typography, Card, Space, Row, Col } from 'antd'
const { Title, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <Row justify="center" style={{ padding: '2rem' }}>
        <Col xs={24} sm={20} md={16} lg={14}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={1}>
                <i className="las la-robot" style={{ marginRight: '10px' }}></i>
                Welcome to AI Agent Platform
              </Title>
              <Paragraph>
                Your all-in-one solution for managing AI agents and automating
                your workflows
              </Paragraph>
            </div>

            <Card>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Title level={3}>
                  <i
                    className="las la-magic"
                    style={{ marginRight: '10px' }}
                  ></i>
                  How It Works
                </Title>

                <Card.Grid style={{ width: '100%', padding: '20px' }}>
                  <Title level={4}>
                    <i
                      className="las la-layer-group"
                      style={{ marginRight: '10px' }}
                    ></i>
                    1. Create Templates
                  </Title>
                  <Paragraph>
                    Start by creating templates that define the behavior and
                    capabilities of your AI agents. Templates serve as
                    blueprints for your automation needs.
                  </Paragraph>
                </Card.Grid>

                <Card.Grid style={{ width: '100%', padding: '20px' }}>
                  <Title level={4}>
                    <i
                      className="las la-robot"
                      style={{ marginRight: '10px' }}
                    ></i>
                    2. Deploy Agents
                  </Title>
                  <Paragraph>
                    Deploy AI agents based on your templates. Each agent can be
                    customized with specific configurations and settings to meet
                    your requirements.
                  </Paragraph>
                </Card.Grid>

                <Card.Grid style={{ width: '100%', padding: '20px' }}>
                  <Title level={4}>
                    <i
                      className="las la-plug"
                      style={{ marginRight: '10px' }}
                    ></i>
                    3. Configure Integrations
                  </Title>
                  <Paragraph>
                    Connect your agents with various platforms and services
                    through our integration system to expand their capabilities.
                  </Paragraph>
                </Card.Grid>

                <Card.Grid style={{ width: '100%', padding: '20px' }}>
                  <Title level={4}>
                    <i
                      className="las la-chart-line"
                      style={{ marginRight: '10px' }}
                    ></i>
                    4. Monitor Performance
                  </Title>
                  <Paragraph>
                    Track your agents' performance and analyze their impact
                    through our comprehensive analytics dashboard.
                  </Paragraph>
                </Card.Grid>
              </Space>
            </Card>

            <Card>
              <Title level={3}>
                <i className="las la-star" style={{ marginRight: '10px' }}></i>
                Key Features
              </Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Card.Grid style={{ width: '100%', padding: '20px' }}>
                    <i
                      className="las la-bolt"
                      style={{ fontSize: '24px', marginBottom: '10px' }}
                    ></i>
                    <Title level={5}>Quick Setup</Title>
                    <Paragraph>
                      Easy-to-use interface for rapid deployment
                    </Paragraph>
                  </Card.Grid>
                </Col>
                <Col xs={24} sm={12}>
                  <Card.Grid style={{ width: '100%', padding: '20px' }}>
                    <i
                      className="las la-cog"
                      style={{ fontSize: '24px', marginBottom: '10px' }}
                    ></i>
                    <Title level={5}>Customizable</Title>
                    <Paragraph>
                      Flexible configuration options for all needs
                    </Paragraph>
                  </Card.Grid>
                </Col>
                <Col xs={24} sm={12}>
                  <Card.Grid style={{ width: '100%', padding: '20px' }}>
                    <i
                      className="las la-shield-alt"
                      style={{ fontSize: '24px', marginBottom: '10px' }}
                    ></i>
                    <Title level={5}>Secure</Title>
                    <Paragraph>Enterprise-grade security measures</Paragraph>
                  </Card.Grid>
                </Col>
                <Col xs={24} sm={12}>
                  <Card.Grid style={{ width: '100%', padding: '20px' }}>
                    <i
                      className="las la-chart-bar"
                      style={{ fontSize: '24px', marginBottom: '10px' }}
                    ></i>
                    <Title level={5}>Analytics</Title>
                    <Paragraph>Detailed insights and reporting</Paragraph>
                  </Card.Grid>
                </Col>
              </Row>
            </Card>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
