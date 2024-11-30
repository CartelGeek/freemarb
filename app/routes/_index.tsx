import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `24/7 AI-Powered Customer Service`,
      description: `Never miss a customer inquiry again with our intelligent WhatsApp agents that provide instant responses around the clock.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Smart Audio Transcription`,
      description: `Convert voice messages to text instantly, making communication seamless and accessible.`,
      icon: <i className="las la-microphone"></i>,
    },
    {
      heading: `No-Code Setup`,
      description: `Launch your AI agent in minutes with our intuitive interface - no technical expertise required.`,
      icon: <i className="las la-magic"></i>,
    },
    {
      heading: `Advanced Analytics`,
      description: `Track performance metrics and customer insights to continuously optimize your service.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Multi-Language Support`,
      description: `Communicate with customers globally with automatic language detection and translation.`,
      icon: <i className="las la-language"></i>,
    },
    {
      heading: `Seamless Integration`,
      description: `Connect with your existing tools and workflows through our powerful API integrations.`,
      icon: <i className="las la-plug"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `E-commerce Owner`,
      content: `AIConnect transformed our customer service. We now handle 5x more inquiries with faster response times and happier customers.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Marcus Rodriguez`,
      designation: `Digital Agency Director`,
      content: `The ROI is incredible. We've cut support costs by 40% while improving customer satisfaction scores.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emma Thompson`,
      designation: `Startup Founder`,
      content: `As a solo founder, AIConnect is like having a full customer service team. It's been a game-changer for scaling my business.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small businesses just getting started`,
      monthly: 29,
      yearly: 290,
      features: [
        `1 AI Agent`,
        `1000 messages/month`,
        `Basic analytics`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for growing businesses`,
      monthly: 99,
      yearly: 990,
      features: [
        `3 AI Agents`,
        `10,000 messages/month`,
        `Advanced analytics`,
        `Priority support`,
        `Custom training`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For large-scale operations`,
      monthly: 299,
      yearly: 2990,
      features: [
        `Unlimited AI Agents`,
        `Unlimited messages`,
        `Custom integrations`,
        `Dedicated account manager`,
        `SLA guarantee`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can I get started?`,
      answer: `You can set up your first AI agent in less than 5 minutes. Our no-code interface makes it simple to configure and launch your automated customer service.`,
    },
    {
      question: `Do I need technical knowledge?`,
      answer: `No technical expertise is required. Our platform is designed to be user-friendly and intuitive for business owners of all technical levels.`,
    },
    {
      question: `Can I customize the AI responses?`,
      answer: `Yes, you can fully customize your AI agent's responses, personality, and knowledge base to match your brand voice and business needs.`,
    },
    {
      question: `What happens if the AI can't answer a question?`,
      answer: `The AI agent will gracefully escalate complex queries to your human team while keeping the customer informed about the process.`,
    },
  ]

  const steps = [
    {
      heading: `Sign Up`,
      description: `Create your account in seconds and connect your WhatsApp business number`,
    },
    {
      heading: `Configure Your Agent`,
      description: `Customize your AI agent's responses and knowledge base through our intuitive interface`,
    },
    {
      heading: `Train & Test`,
      description: `Fine-tune your agent's responses with real conversations and test scenarios`,
    },
    {
      heading: `Go Live`,
      description: `Launch your AI agent and start delivering 24/7 automated customer service`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in customer messages`,
    },
    {
      emoji: `⏰`,
      title: `Working late hours to answer queries`,
    },
    {
      emoji: `💸`,
      title: `Losing sales due to slow response times`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your WhatsApp Into an AI-Powered Customer Service Machine`}
        subtitle={`Handle unlimited customer inquiries 24/7 with intelligent AI agents that understand and respond like humans - all through WhatsApp`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/n2J2Mn-aiconnect-Vuxg`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`businesses growing with AIConnect`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Brands`} />
      <LandingPainPoints
        title={`Businesses lose $75B annually due to poor customer service. Don't be one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Launch Your AI Customer Service in Minutes`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Automate Customer Service`}
        subtitle={`Powerful features that help you deliver exceptional customer experience at scale`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ Businesses Already Saving Time and Money`}
        subtitle={`See how others are transforming their customer service with AIConnect`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Scale Your Customer Service Without Scaling Costs`}
        subtitle={`Choose the perfect plan for your business needs`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About AIConnect`}
        subtitle={`Everything you need to know about getting started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Customer Service?`}
        subtitle={`Join thousands of businesses delivering exceptional customer experience with AIConnect`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
