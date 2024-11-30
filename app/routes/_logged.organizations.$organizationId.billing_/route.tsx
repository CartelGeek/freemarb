import {
  Typography,
  Card,
  Button,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
} from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BillingPage() {
  const { organizationId } = useParams()

  // Fetch subscription data
  const { data: subscriptions, isLoading: loadingSubscriptions } =
    Api.subscription.findMany.useQuery({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    })

  // Fetch available products
  const { data: products, isLoading: loadingProducts } =
    Api.billing.findManyProducts.useQuery({})

  // Fetch payment history
  const { data: payments, isLoading: loadingPayments } =
    Api.billing.findManyPayments.useQuery({})

  // Payment link mutation
  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const handleUpgrade = async (productId: string) => {
    const paymentLink = await createPaymentLink({ productId })
    window.location.href = paymentLink
  }

  const currentPlan = subscriptions?.[0]

  const paymentColumns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'succeeded' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-credit-card" style={{ marginRight: 8 }}></i>
          Billing & Subscription
        </Title>
        <Text type="secondary">
          Manage your subscription, payment methods, and billing history
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            {/* Current Plan */}
            <Card
              title={
                <>
                  <i className="las la-crown"></i> Current Plan
                </>
              }
            >
              {currentPlan ? (
                <>
                  <Statistic
                    title="Current Plan"
                    value={currentPlan.plan || 'Free'}
                    prefix={<i className="las la-star"></i>}
                  />
                  <Text type="secondary">Status: </Text>
                  <Tag
                    color={currentPlan.status === 'active' ? 'green' : 'red'}
                  >
                    {currentPlan.status}
                  </Tag>
                </>
              ) : (
                <Text>No active subscription</Text>
              )}
            </Card>

            {/* Available Plans */}
            <Card
              title={
                <>
                  <i className="las la-layer-group"></i> Available Plans
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Row gutter={[16, 16]}>
                {products?.map(product => (
                  <Col xs={24} sm={12} key={product.id}>
                    <Card>
                      <Statistic
                        title={product.name}
                        value={`$${product.price}/month`}
                      />
                      <Button
                        type="primary"
                        onClick={() => handleUpgrade(product.id)}
                        style={{ marginTop: 16 }}
                      >
                        {currentPlan?.plan === product.name
                          ? 'Current Plan'
                          : 'Upgrade'}
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            {/* Payment Methods */}
            <Card
              title={
                <>
                  <i className="las la-wallet"></i> Payment Methods
                </>
              }
            >
              <Button type="primary" icon={<i className="las la-plus"></i>}>
                Add Payment Method
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Billing History */}
        <Card
          title={
            <>
              <i className="las la-history"></i> Billing History
            </>
          }
          style={{ marginTop: 24 }}
        >
          <Table
            dataSource={payments}
            columns={paymentColumns}
            loading={loadingPayments}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </PageLayout>
  )
}
